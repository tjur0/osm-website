export const calculateFeatureImportance = `WITH tag_counts AS (
  SELECT 
    p."featureId",
    COUNT(*) AS tag_count
  FROM pois p,
    LATERAL jsonb_each_text(p.tags)
  WHERE p."featureId" IS NOT NULL
  GROUP BY p.id, p."featureId"
),
avg_tags AS (
  SELECT 
    f.id,
    AVG(tc.tag_count) AS avg_tag_count
  FROM tag_counts tc
  JOIN feature f ON f.id = tc."featureId"
  GROUP BY f.id
),
stats AS (
  SELECT 
    MAX(LOG(avg_tag_count + 1)) AS max_log,
    MIN(LOG(avg_tag_count + 1)) AS min_log
  FROM avg_tags
),
scored AS (
  SELECT 
    at.id,
    ROUND((LOG(at.avg_tag_count + 1) - s.min_log) / NULLIF((s.max_log - s.min_log), 0), 4) AS importance
  FROM avg_tags at
  CROSS JOIN stats s
)
UPDATE feature f
SET importance = s.importance
FROM scored s
WHERE f.id = s.id;`;
