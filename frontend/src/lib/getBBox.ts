import { pool } from "@/lib/db";

export async function getBBox(params: {
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  type?: string;
  id?: string | number;
}) {
  const { country, state, city, street, type, id } = params;

  const where: string[] = [];
  const values: (string | number)[] = [];

  if (country) {
    where.push(`country = $${values.length + 1}`);
    values.push(country);
  }
  if (state) {
    where.push(`state = $${values.length + 1}`);
    values.push(state);
  }
  if (city) {
    where.push(`city = $${values.length + 1}`);
    values.push(city);
  }
  if (street) {
    where.push(`street = $${values.length + 1}`);
    values.push(street);
  }
  if (type) {
    where.push(`type = $${values.length + 1}`);
    values.push(type);
  }
  if (id) {
    where.push(`id = $${values.length + 1}`);
    values.push(typeof id === "string" ? Number(id) : id);
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const response = await pool.query(
    `SELECT MIN(ST_X(point)) AS min_lng, MIN(ST_Y(point)) AS min_lat, MAX(ST_X(point)) AS max_lng, MAX(ST_Y(point)) AS max_lat FROM pois ${whereClause}`,
    values
  );

  const { min_lng, min_lat, max_lng, max_lat } = response.rows[0] ?? {};

  if (!min_lng || !min_lat || !max_lng || !max_lat) {
    return null; // or throw new Error("No data found")
  }

  const bbox: [[number, number], [number, number]] = [
    [min_lng, min_lat],
    [max_lng, max_lat],
  ];

  return bbox as maplibregl.LngLatBoundsLike;
}
