import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await pool.query(
      `SELECT DISTINCT f.id, f.name, f.color, f.importance 
       FROM feature f 
       INNER JOIN pois p ON p."featureId" = f.id 
       ORDER BY f.importance DESC, f.name ASC 
       LIMIT 10`
    );

    return NextResponse.json(response.rows);
  } catch (error) {
    console.error("Error fetching features:", error);
    return NextResponse.json(
      { error: "Failed to fetch features" },
      { status: 500 }
    );
  }
}
