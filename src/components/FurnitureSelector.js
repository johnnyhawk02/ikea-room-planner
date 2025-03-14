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
            {items.name || category.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <select
            onChange={(e) => {
              if (e.target.value) {
                const variant = items.variants.find(v => v.id === e.target.value);
                if (variant) onSelect(variant);
              }
            }}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
            defaultValue=""
          >
            <option value="">Select {category}</option>
            {items.variants?.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.name} ({variant.width}×{variant.length}cm)
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FurnitureSelector;