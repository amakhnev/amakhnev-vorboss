import type { Widget } from '../types'; 

export const mapWidgets = (rows: any[]): Widget[] => {
  return rows.map(row => mapWidget(row));
};

export const mapWidget = (row: any): Widget => {
    return {
      id: row.id,
      name: row.name,
      manufacturer: row.manufacturer,
      inventory: row.inventory
    };
  };