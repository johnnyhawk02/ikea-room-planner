import React from 'react';
import { furnitureCatalog } from '../data/furnitureCatalog';

const FurnitureSelector = ({ onSelect }) => {
  const categories = Object.entries(furnitureCatalog);

  return (
    <div className="furniture-selector p-4 bg-gray-100 overflow-y-auto h-screen">
      <h2 className="text-xl font-bold mb-4">IKEA Furniture</h2>
      {categories.map(([category, items]) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold capitalize mb-2">
            {category.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="p-2 bg-white rounded shadow hover:bg-gray-50 transition-colors text-left"
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">
                  {item.width}×{item.length} cm
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FurnitureSelector;