import { nile } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const city = searchParams.get("city");
  const street = searchParams.get("street");
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  const where: string[] = [];
  const values: (string | number)[] = [];

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
    values.push(Number(id));
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const response = await nile.db.query(
    `SELECT MIN(ST_X(point)) AS min_lng, MIN(ST_Y(point)) AS min_lat, MAX(ST_X(point)) AS max_lng, MAX(ST_Y(point)) AS max_lat FROM pois ${whereClause}`,
    values
  );

  const { min_lng, min_lat, max_lng, max_lat } = response.rows[0];
  const bbox: [[number, number], [number, number]] = [
    [min_lng, min_lat],
    [max_lng, max_lat],
  ];

  return NextResponse.json({ bbox });
}
