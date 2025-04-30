import db from "../../../../static/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const city = searchParams.get("city");
  const street = searchParams.get("street");
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  const where = [];
  const values: (string | number)[] = [];

  if (state) {
    where.push("state = ?");
    values.push(state);
  }
  if (city) {
    where.push("city = ?");
    values.push(city);
  }
  if (street) {
    where.push("street = ?");
    values.push(street);
  }
  if (type) {
    where.push("type = ?");
    values.push(type);
  }
  if (id) {
    where.push("id = ?");
    values.push(Number(id));
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const stmt = db.prepare(`SELECT point FROM pois ${whereClause}`);
  const rows = stmt.all(values) as { point: string }[];

  if (!rows.length) {
    return NextResponse.json(
      { message: "No matching POIs found" },
      { status: 404 }
    );
  }

  let minLng = Infinity,
    minLat = Infinity,
    maxLng = -Infinity,
    maxLat = -Infinity;

  for (const row of rows) {
    try {
      const [lng, lat] = JSON.parse(row.point);
      if (!Array.isArray([lng, lat])) continue;

      minLng = Math.min(minLng, lng);
      minLat = Math.min(minLat, lat);
      maxLng = Math.max(maxLng, lng);
      maxLat = Math.max(maxLat, lat);
    } catch (error) {
      console.error("Invalid point:", row.point, error);
    }
  }

  const bbox: [[number, number], [number, number]] = [
    [minLng, minLat],
    [maxLng, maxLat],
  ];

  return NextResponse.json({ bbox });
}
