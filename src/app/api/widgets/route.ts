import { NextResponse } from "next/server";
import pool from "../../utils/db";
import { Widget } from "@/app/types";
import { mapRowsToWidgets, mapToSelectQuery, mapWidgetToInsertQuery } from "@/app/utils/mapping";

export const GET = async (request: Request) => {
  try {
    const result = await pool.query(...mapToSelectQuery());
    const widgets: Widget[] = mapRowsToWidgets(result.rows);

    return NextResponse.json(widgets);
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const widget: Widget = await request.json();

    const result = await pool.query(...mapWidgetToInsertQuery(widget));
    
    return NextResponse.json(mapRowsToWidgets(result.rows)[0]);
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
