#!/bin/sh

set -e
export PGUSER="$POSTGRES_USER"

psql -c "ALTER SYSTEM SET max_wal_size='${PG_MAX_WAL_SIZE:-2GB}';"
psql -c "ALTER SYSTEM SET checkpoint_timeout='${PG_CHECKPOINT_TIMEOUT:-15min}';"

psql -c "ALTER SYSTEM SET work_mem='${PG_WORK_MEM:-128MB}';"
psql -c "ALTER SYSTEM SET maintenance_work_mem='${PG_MAINTENANCE_WORK_MEM:-4GB}';"
psql -c "CREATE EXTENSION IF NOT EXISTS hstore;"