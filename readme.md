docker compose -p osm-nl up --build

<!-- start backend to run db migrations -->

<!-- step 1 on wsl -->

ogr2ogr -f GeoJSONSeq pois.ndjson PG:"host=localhost dbname=gis user=postgres password=" \
 -lco RS=YES \
 -sql "
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

<!-- step 2 on wsl -->

tippecanoe -o pois.mbtiles \
 --layer=pois \
 --read-parallel \
 -Z0 -z16 \
 --drop-densest-as-needed \
 --maximum-tile-bytes=25000 \
 --force \
 --base-zoom=0 \
 pois.ndjson

<!-- step 3 on windows with .\pmtiles.exe in ../  -->

.\pmtiles.exe convert .\pois.mbtiles .\pois.pmtiles

<!-- nominatim -->

docker run -it -e PBF_URL=https://download.geofabrik.de/europe/netherlands-latest.osm.pbf -e REPLICATION_URL=https://download.geofabrik.de/europe/netherlands-updates/ -p 8080:8080 --name nominatim mediagis/nominatim:5.1
