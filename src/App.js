import React, { useState } from 'react';
import RoomCanvas from './components/RoomCanvas';
import FurnitureSelector from './components/FurnitureSelector';
import './App.css';

function App() {
  const [roomDimensions, setRoomDimensions] = useState({
    width: 500,
    length: 400,
  });

  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [showLabels, setShowLabels] = useState(false);

  const handleDimensionChange = (dimension, value) => {
    const numValue = parseInt(value, 10);
    setRoomDimensions(prev => ({
      ...prev,
      [dimension]: numValue || prev[dimension]
    }));
  };

  const handleFurnitureSelect = (furniture) => {
    setSelectedFurniture({...furniture});
    setTimeout(() => setSelectedFurniture(null), 100);
  };

  const handleClearRoom = () => {
    setSelectedFurniture({ type: 'clear' });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <aside className="w-72 bg-white shadow-lg overflow-y-auto flex-shrink-0">
        <FurnitureSelector onSelect={handleFurnitureSelect} />
      </aside>
      
      <main className="flex-1 p-4 flex flex-col overflow-hidden">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex-shrink-0">
          <h2 className="text-lg font-bold mb-2">Room Dimensions</h2>
          <div className="flex gap-4 items-end">
            <div>
              <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width (cm)</label>
              <input
                id="width"
                type="number"
                value={roomDimensions.width}
                onChange={(e) => handleDimensionChange('width', e.target.value)}
                className="mt-1 block w-32 rounded-md border border-gray-300 shadow-sm px-3 py-2"
                min="100"
                max="1000"
                step="10"
              />
            </div>
            <div>
              <label htmlFor="length" className="block text-sm font-medium text-gray-700">Length (cm)</label>
              <input
                id="length"
                type="number"
                value={roomDimensions.length}
                onChange={(e) => handleDimensionChange('length', e.target.value)}
                className="mt-1 block w-32 rounded-md border border-gray-300 shadow-sm px-3 py-2"
                min="100"
                max="1000"
                step="10"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showLabels"
                checked={showLabels}
                onChange={(e) => setShowLabels(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="showLabels" className="text-sm font-medium text-gray-700">
                Show Labels
              </label>
            </div>
            <button
              onClick={handleClearRoom}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Clear Room
            </button>
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
          <RoomCanvas
            dimensions={roomDimensions}
            selectedFurniture={selectedFurniture}
            showLabels={showLabels}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
