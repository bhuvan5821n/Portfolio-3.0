# Portfolio 3.0 Backend - PostgreSQL Migration 001
# Run with: psql $DATABASE_URL -f 001_initial_schema.sql

BEGIN;

-- All statements from 001_initial_schema.sql are idempotent (IF NOT EXISTS)
-- Safe to run multiple times

COMMIT;
