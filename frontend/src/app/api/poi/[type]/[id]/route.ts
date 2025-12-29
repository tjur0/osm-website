import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export interface Poi {
  id: number;
  type: string;
  feature: string;
  color: string;
  tags: Record<string, string>;
  country: string;
  state: string;
  city: string;
  street: string;
  name: string;
  typeName: string;
  point: { type: string; coordinates: number[] };
  area?: { type: string; coordinates: number[][][] };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
): Promise<NextResponse> {
  const { type, id } = await params;

  try {
    const response = await pool.query(
      `SELECT p.id, p.type, f.name as feature, f.color as color, p.tags, p.country, p.state, p.city, p.street, p.name, p."typeName", p.point::json as point, p.area::json as area FROM pois p left join feature f on f.id = p."featureId" WHERE p.id = $1 AND p.type = $2`,
      [id, type]
    );

    const poi = response.rows[0] as Poi;

    if (!poi) {
      return NextResponse.json({ error: "POI not found" }, { status: 404 });
    }

    return NextResponse.json(poi);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
