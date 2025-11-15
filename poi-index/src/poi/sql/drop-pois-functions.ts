export const dropPoisFunctions = /* sql */ `
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT 
            'DROP FUNCTION IF EXISTS ' || 
            ns.nspname || '.' || 
            p.proname || '(' || 
            pg_get_function_identity_arguments(p.oid) || ') CASCADE;' as drop_statement
        FROM pg_proc p
        INNER JOIN pg_namespace ns ON (p.pronamespace = ns.oid)
        WHERE ns.nspname = 'public' 
        AND p.proname = 'pois'
    LOOP
        EXECUTE r.drop_statement;
    END LOOP;
END $$;
`;
