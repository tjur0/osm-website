export const poisFunction = /* sql */ `CREATE OR REPLACE FUNCTION public.pois(
    z integer, 
    x integer, 
    y integer
)
RETURNS bytea AS $$
DECLARE
  mvt bytea;
  tile_bbox_3857 geometry := ST_TileEnvelope(z, x, y);
  tile_bbox_4326 geometry := ST_Transform(tile_bbox_3857, 4326);
BEGIN
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
        p.point,
        tile_bbox_4326,
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
      AND f.importance >= CASE
        WHEN z <= 6 THEN 0.8
        WHEN z <= 8 THEN 0.7
        WHEN z <= 10 THEN 0.6
        WHEN z <= 13 THEN 0.4
        WHEN z <= 14 THEN 0.2
        ELSE 0.0
      END
  ) AS tile;

  RETURN mvt;
END;
$$ LANGUAGE plpgsql;`;
