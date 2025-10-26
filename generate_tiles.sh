#!/bin/bash
set -e

if [ -z "$PG_HOST" ] || [ -z "$PG_DBNAME" ] || [ -z "$PG_USER" ] || [ -z "$PG_PASSWORD" ]; then
    echo "ERROR: Database credentials (PG_HOST, PG_DBNAME, PG_USER, PG_PASSWORD) are required."
    exit 1
fi

if [ -z "$MINIO_HOST" ] || [ -z "$MINIO_ACCESS_KEY" ] || [ -z "$MINIO_SECRET_KEY" ]; then
    echo "ERROR: MinIO credentials (MINIO_HOST, MINIO_ACCESS_KEY, MINIO_SECRET_KEY) are required."
    exit 1
fi

BASE_SQL="
SELECT
    p.id,
    p.type,
    p.point,
    p.name,
    p.\"typeName\",
    p.country,
    p.state,
    p.city,
    p.street,
    f.importance,
    f.color
FROM pois p
JOIN feature f ON f.id = p.\"featureId\"
WHERE p.country = 'Nederland'
"

extract_data() {
    local_filename=$1
    local_where_clause=$2
    
    echo "--- Extracting: $local_filename ($local_where_clause)"
    
    ogr2ogr -f GeoJSONSeq "$local_filename" \
        PG:"host=$PG_HOST dbname=$PG_DBNAME user=$PG_USER password=$PG_PASSWORD" \
        -lco RS=YES \
        -sql "$BASE_SQL AND $local_where_clause"
        
    if [ ! -s "$local_filename" ]; then
         echo "WARNING: $local_filename was not created or is empty. This might be normal if no data matches."
    else
        echo "--- Completed: $local_filename"
    fi
}

run_tippecanoe() {
    local_infile=$1
    local_outfile=$2
    local_min_zoom=$3
    
    if [ ! -s "$local_infile" ]; then
        echo "--- Skipping $local_infile (empty or missing)..."
        return
    fi
    
    echo "--- Processing: $local_infile into $local_outfile (Z$local_min_zoom-z16)"
    tippecanoe -o "$local_outfile" \
        --layer=pois \
        --read-parallel \
        -Z"$local_min_zoom" -z16 \
        --drop-densest-as-needed \
        --maximum-tile-bytes=50000 \
        --force \
        --base-zoom="$local_min_zoom" \
        "$local_infile"
        
    # Add to our list of files to join
    MBTILES_TO_JOIN+=("$local_outfile")
}

echo "Step 1: Extracting data into separate layers..."

extract_data "pois_z0.ndjson"  "f.importance >= 0.8"
extract_data "pois_z7.ndjson"  "f.importance >= 0.7 AND f.importance < 0.8"
extract_data "pois_z9.ndjson"  "f.importance >= 0.6 AND f.importance < 0.7"
extract_data "pois_z11.ndjson" "f.importance >= 0.4 AND f.importance < 0.6"
extract_data "pois_z14.ndjson" "f.importance >= 0.2 AND f.importance < 0.4"
extract_data "pois_z15.ndjson" "f.importance < 0.2"

echo "Data extraction complete."

echo "Step 2: Generating separate MBTiles for each layer..."
MBTILES_TO_JOIN=()

run_tippecanoe "pois_z0.ndjson"  "pois_z0.mbtiles"  0
run_tippecanoe "pois_z7.ndjson"  "pois_z7.mbtiles"  7
run_tippecanoe "pois_z9.ndjson"  "pois_z9.mbtiles"  9
run_tippecanoe "pois_z11.ndjson" "pois_z11.mbtiles" 11
run_tippecanoe "pois_z14.ndjson" "pois_z14.mbtiles" 14
run_tippecanoe "pois_z15.ndjson" "pois_z15.mbtiles" 15

if [ ${#MBTILES_TO_JOIN[@]} -eq 0 ]; then
    echo "ERROR: No mbtiles were generated. Check data extraction."
    exit 1
fi


tile-join -o pois.mbtiles -f "${MBTILES_TO_JOIN[@]}"

pmtiles convert pois.mbtiles pois.pmtiles

cp pois.pmtiles /app/output/pois.pmtiles

mc alias set local $MINIO_HOST $MINIO_ACCESS_KEY $MINIO_SECRET_KEY
mc mb local/tiles || true
mc anonymous set public local/tiles
mc cp pois.pmtiles local/tiles/pois.pmtiles

rm -f pois_z*.ndjson
rm -f pois_z*.mbtiles
rm -f pois.mbtiles


echo "All steps completed successfully. Final file: pois.pmtiles"