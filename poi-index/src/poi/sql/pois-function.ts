export const poisFunction = /* sql */ `CREATE OR REPLACE FUNCTION public.pois(
    z integer, 
    x integer, 
    y integer,
    query_params jsonb DEFAULT '{}'::jsonb
)
RETURNS bytea AS $$
DECLARE
  mvt bytea;
  tile_bbox_3857 geometry := ST_TileEnvelope(z, x, y);
  tile_bbox_4326 geometry := ST_Transform(tile_bbox_3857, 4326);
  feature_ids_array text[];
BEGIN
  IF query_params ? 'feature_ids' THEN
    IF jsonb_typeof(query_params->'feature_ids') = 'array' THEN
      feature_ids_array := ARRAY(
        SELECT jsonb_array_elements_text(query_params->'feature_ids')
      );
    ELSE
      feature_ids_array := ARRAY[query_params->>'feature_ids'];
    END IF;
  END IF;

  SELECT INTO mvt ST_AsMVT(tile, 'pois', 4096, 'geom')
  FROM (
    SELECT
      p.id,
      p.type,
      p.name,
      p.country,
      p.state,
      p.city,
      p.street,
      f.name as "feature",
      f.color as "color",
      ST_AsMVTGeom(
        ST_Transform(p.point, 3857),
        tile_bbox_3857,
        4096, 64, true
      ) AS geom
      
    FROM public.pois AS p
    LEFT JOIN public.feature AS f
    ON p."featureId" = f.id
    WHERE
      p.point && tile_bbox_4326
      AND p.id IS NOT NULL
      AND p.type IS NOT NULL
      AND p."featureId" IS NOT NULL
      AND (feature_ids_array IS NULL OR p."featureId"::text = ANY(feature_ids_array))
      -- AND f.importance >= CASE
      --   WHEN z <= 6 THEN 0.8
      --   WHEN z <= 8 THEN 0.7
      --   WHEN z <= 10 THEN 0.6
      --   WHEN z <= 13 THEN 0.4
      --   WHEN z <= 14 THEN 0.2
      --   ELSE 0.0
      -- END
  ) AS tile;

  RETURN mvt;
END;
$$ LANGUAGE plpgsql IMMUTABLE STRICT PARALLEL SAFE;`;
