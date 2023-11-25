import { NextResponse } from "next/server";
import pool from "../../utils/db";
import { Widget } from "@/app/types";
import { mapWidgets } from "@/app/utils/mapping";

export const GET = async (request: Request) => {
  try {
    const result = await pool.query(
      "SELECT id, name, manufacturer, inventory FROM widgets"
    );
    const widgets: Widget[] = mapWidgets(result.rows);

    return NextResponse.json(widgets);
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body: Widget = await request.json();

    const result = await pool.query(
      "INSERT INTO widgets (name, manufacturer, inventory) VALUES ($1, $2, $3) RETURNING *",
      [body.name, body.manufacturer, body.inventory]
    );
    
    return NextResponse.json(mapWidgets(result.rows)[0]);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};
