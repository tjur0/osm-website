#!/bin/bash

echo "Starting osm2pgsql replication process..."

# Ensure that PostgreSQL is reachable before starting replication
i=1
MAXCOUNT=60
echo "Waiting for PostgreSQL to be running"
while [ $i -le $MAXCOUNT ]
do
  pg_isready -q && echo "PostgreSQL running" && break
  sleep 2
  i=$((i+1))
done
test $i -gt $MAXCOUNT && echo "Timeout while waiting for PostgreSQL to be running"

# osm2pgsql-replication init -d osm --osm-file us-latest.osm.pbf
osm2pgsql-replication init \
  --database gis \
  --username $PGUSER \
  --host $PGHOST \
  --password $PGPASSWORD

# Run replication loop
while true; do
  echo "Running osm2pgsql-replication update..."
  
  osm2pgsql-replication update \
    --database gis \
    --username $PGUSER \
    --host $PGHOST
  
  echo "Waiting for $REPLICATION_INTERVAL seconds before the next update..."
  sleep $REPLICATION_INTERVAL
done
