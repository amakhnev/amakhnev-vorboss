import { NextResponse } from "next/server";
import pool from "../../../utils/db";
import { Widget } from "@/app/types";
import { mapWidgets } from "@/app/utils/mapping";

export const DELETE = async (
  request: Request,
  route: { params: { id: string } }
) => {
  const id: string = route.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM widgets WHERE id = $1  RETURNING *",
      [id]
    );

    const widgets: Widget[] = mapWidgets(result.rows);
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
    const body: Widget = await request.json();
    const result = await pool.query(
      "UPDATE widgets SET name = $1, manufacturer = $2, inventory = $3 WHERE id = $4 RETURNING *",
      [body.name, body.manufacturer, body.inventory, id]
    );

    const updatedWidgets: Widget[] = mapWidgets(result.rows);
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
