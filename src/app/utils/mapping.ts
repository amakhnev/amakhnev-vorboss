import type { Widget } from '../types'; 

export const mapRowsToWidgets = (rows: any[]): Widget[] => {
  return rows.map(row => mapRowToWidget(row));
};

export const mapRowToWidget = (row: any): Widget => {
    return {
      id: row.id,
      name: row.name,
      manufacturer: row.manufacturer,
      inventory: row.inventory
    };
  };

  export const mapWidgetToInsertQuery = (widget: Widget): [string, (string | number)[]] => {
    const query = "INSERT INTO widgets (name, manufacturer, inventory) VALUES ($1, $2, $3) RETURNING *";
    const values: (string | number)[]  = [widget.name, widget.manufacturer, widget.inventory];
  
    return [ query, values ];
  };

  export const mapWidgetToUpdateQuery = (widget: Widget): [string, (string | number)[]] => {
    const query = "UPDATE widgets SET name = $1, manufacturer = $2, inventory = $3 WHERE id = $4 RETURNING *";
    const values: (string | number)[]  = [widget.name, widget.manufacturer, widget.inventory, widget.id??""];
  
    return [ query, values ];
  };

  export const mapWidgetIdToDeleteQuery = (widgetId: string): [string, string[]] => {
    const query = "DELETE FROM widgets WHERE id = $1  RETURNING *";
    const values: string[]  = [widgetId];
  
    return [ query, values ];
  };

  export const mapToSelectQuery = (): [string] => {
    const query = "SELECT id, name, manufacturer, inventory FROM widgets";
    return [ query];
  };



