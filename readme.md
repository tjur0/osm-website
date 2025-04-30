docker compose -p osm-nl up --build

ogr2ogr -f GeoJSONSeq pois.ndjson PG:"host=localhost dbname=gis user=postgres" -lco RS=YES -sql "SELECT id, type, point, country, state, city, street, name FROM pois where country = 'Nederland'"

cd tippecanoe

tippecanoe -o ../pois.mbtiles \
 --read-parallel \
 -Z0 -z16 \
 --full-detail=14 \
 --low-detail=10 \
 --drop-densest-as-needed \
 --simplification=2 \b
--cluster-densest-as-needed \
 --no-tile-size-limit \
 --no-feature-limit \
 --force \
 --drop-rate=0.5 \
 ../pois.ndjson

tippecanoe -o ../pois.mbtiles --read-parallel -Z0 -z16 --full-detail=14 --low-detail=10 --drop-densest-as-needed --simplification=2 --cluster-densest-as-needed --no-tile-size-limit --no-feature-limit --drop-rate=0.5 --force ../pois.ndjson

docker run -it -e PBF_URL=https://download.geofabrik.de/europe/netherlands-latest.osm.pbf -e REPLICATION_URL=https://download.geofabrik.de/europe/netherlands-updates/ -p 8080:8080 --name nominatim mediagis/nominatim:5.1

pmtiles convert in out
