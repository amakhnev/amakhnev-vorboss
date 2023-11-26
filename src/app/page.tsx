'use client'
import { useState, useEffect } from "react";
import { Widget } from "./types";

export default function Home() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  
    useEffect(() => {
    const fetchWidgets = async () => {
      const response = await fetch("/api/widgets");
      const data = await response.json();
      setWidgets(data);
    };

    fetchWidgets();
  }, []);

  const deleteWidget = async (widget:Widget) => {
    try {
      const response = await fetch(`/api/widgets/${widget.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWidgets(widgets.filter(w => w.id !== widget.id));
      } else {
        // Handle the error response from your API
        console.error('Failed to delete the widget');
      }
    } catch (error) {
      console.error('Error deleting widget:', error);
    }
  };
  return (
    <main className="w-screen">
      <div className="mx-auto mt-8 max-w-screen-lg px-2">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base font-bold text-gray-900">Widgets</p>

          <div className="mt-4 sm:mt-0">
            <div className="flex items-center justify-start sm:justify-end">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
              >
                Add New
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b md:table-header-group">
              <tr className="">
                <td
                  width="50%"
                  className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                >
                  Widget
                </td>

                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Manufacturer
                </td>

                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Inventory Stock
                </td>

                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Actions
                </td>
              </tr>
            </thead>

            <tbody className="md:border-gray-300">
              {widgets.map((widget: Widget) => (
                <tr key={widget.id ?? ""} className="">
                  <td
                    width="50%"
                    className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                  >
                    {widget.name}
                    <div className="mt-1 md:hidden">
                      <p className="font-normal text-gray-500">
                        {widget.manufacturer}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 md:table-cell">
                    {widget.manufacturer}
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 md:text-left">
                    {widget.inventory}
                    <button
                      type="button"
                      className="md:hidden items-center rounded-full w-16 bg-blue-600 hover:bg-blue-500 p-1 m-1 text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteWidget(widget)}
                      className="md:hidden items-center rounded-full w-16 bg-red-200 hover:bg-red-100 p-1 m-1 text-red-600 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 md:table-cell">
                    <button
                      type="button"
                      className="items-center rounded-full w-16 bg-blue-600 hover:bg-blue-500 p-1 m-1 text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteWidget(widget)}
                      className="items-center rounded-full w-16 bg-red-200 hover:bg-red-100 p-1 m-1 text-red-600 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
