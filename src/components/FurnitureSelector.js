import React from 'react';
import { furnitureCatalog } from '../data/furnitureCatalog';

const FurnitureSelector = ({ onSelect }) => {
  const categories = Object.entries(furnitureCatalog);

  return (
    <div className="furniture-selector p-2 bg-gray-100 overflow-y-auto h-screen">
      <h2 className="text-md font-bold mb-2 px-1">Furniture</h2>
      {categories.map(([category, items]) => (
        <div key={category} className="mb-3">
          <h3 className="text-sm font-semibold capitalize mb-1 px-1">
            {items.name || category.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <select
            onChange={(e) => {
              if (e.target.value) {
                const variant = items.variants.find(v => v.id === e.target.value);
                if (variant) onSelect(variant);
              }
            }}
            className="block w-full rounded border border-gray-300 py-1 px-2 text-sm bg-white"
            defaultValue=""
          >
            <option value="">Select {items.name.toLowerCase()}</option>
            {items.variants?.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FurnitureSelector;