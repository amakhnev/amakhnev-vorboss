import { NextResponse } from "next/server";
import pool from "../../../utils/db";
import { Widget } from "@/app/types";
import { mapRowsToWidgets, mapWidgetIdToDeleteQuery, mapWidgetToUpdateQuery } from "@/app/utils/mapping";

export const DELETE = async (
  request: Request,
  route: { params: { id: string } }
) => {
  const id: string = route.params.id;

  try {
    const result = await pool.query(...mapWidgetIdToDeleteQuery(id));

    const widgets: Widget[] = mapRowsToWidgets(result.rows);
    if (widgets.length > 0) {
      return new NextResponse(null, { status: 204 }); // 204 No Content
    } else {
      return NextResponse.json(
        {
          error: "Not found",
        },
        { status: 404 }
      );
    }
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

export const PUT = async (
  request: Request,
  route: { params: { id: string } }
) => {
  try {
    const id: string = route.params.id;
    const widget: Widget = await request.json();
    widget.id = id; // can check if missing or different and return error
    const result = await pool.query(...mapWidgetToUpdateQuery(widget));

    const updatedWidgets: Widget[] = mapRowsToWidgets(result.rows);
    if (updatedWidgets.length == 1) {
      return NextResponse.json(updatedWidgets[0]);
    } else {
      return NextResponse.json(
        {
          error: "Not found",
        },
        { status: 404 }
      );
    }
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
