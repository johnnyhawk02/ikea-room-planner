import React, { useState } from 'react';
import RoomCanvas from './components/RoomCanvas';
import FurnitureSelector from './components/FurnitureSelector';
import './App.css';

function App() {
  const [roomDimensions, setRoomDimensions] = useState({
    width: 500, // 500cm = 5m
    length: 400, // 400cm = 4m
  });

  const [selectedFurniture, setSelectedFurniture] = useState(null);

  const handleDimensionChange = (dimension, value) => {
    const parsedValue = parseInt(value, 10) || 100; // Default to 100 if invalid
    if (parsedValue >= 100 && parsedValue <= 1000) {
      setRoomDimensions(prev => ({
        ...prev,
        [dimension]: parsedValue
      }));
    }
  };

  const handleFurnitureSelect = (furniture) => {
    console.log('Selected furniture:', furniture); // Debug log
    setSelectedFurniture({...furniture}); // Create new object to ensure state update
    // Reset selection after it's been processed
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
              <label className="block text-sm font-medium text-gray-700">Width (cm)</label>
              <input
                type="number"
                value={roomDimensions.width}
                onChange={(e) => handleDimensionChange('width', e.target.value)}
                onBlur={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value < 100) handleDimensionChange('width', '100');
                  if (value > 1000) handleDimensionChange('width', '1000');
                }}
                className="mt-1 block w-32 rounded-md border border-gray-300 shadow-sm px-3 py-2"
                min="100"
                max="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Length (cm)</label>
              <input
                type="number"
                value={roomDimensions.length}
                onChange={(e) => handleDimensionChange('length', e.target.value)}
                onBlur={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value < 100) handleDimensionChange('length', '100');
                  if (value > 1000) handleDimensionChange('length', '1000');
                }}
                className="mt-1 block w-32 rounded-md border border-gray-300 shadow-sm px-3 py-2"
                min="100"
                max="1000"
              />
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
          />
        </div>
      </main>
    </div>
  );
}

export default App;
