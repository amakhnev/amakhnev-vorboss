import React, { useEffect, useState } from 'react';
import { Widget } from '../types';

interface WidgetEditProps {
    isOpen: boolean;
    onSave: (widget: Widget) => void;
    onCancel: () => void;
    initialData?: Widget;
}

const WidgetEdit: React.FC<WidgetEditProps> = ({ isOpen, onSave, onCancel, initialData }) => {
  const [widget, setWidget] = useState(initialData || { name: '', manufacturer: '', inventory: 0 });

  useEffect(() => {
    setWidget(initialData || { name: '', manufacturer: '', inventory: 0 });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidget({ ...widget, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center"> {/* Overlay */}
      <div className="bg-white p-5 rounded shadow-lg w-1/2"> {/* Modal Content */}
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          onSave(widget);
        }}>

          {/* Form Row for Name */}
          <div className="flex items-center">
            <label htmlFor="name" className="w-1/3">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={widget.name}
              onChange={handleChange}
              className="w-2/3 p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Form Row for Manufacturer */}
          <div className="flex items-center">
            <label htmlFor="manufacturer" className="w-1/3">Manufacturer:</label>
            <input
              type="text"
              name="manufacturer"
              id="manufacturer"
              value={widget.manufacturer}
              onChange={handleChange}
              className="w-2/3 p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Form Row for Inventory */}
          <div className="flex items-center">
            <label htmlFor="inventory" className="w-1/3">Inventory:</label>
            <input
              type="number"
              name="inventory"
              id="inventory"
              value={widget.inventory}
              onChange={handleChange}
              className="w-2/3 p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default WidgetEdit;
