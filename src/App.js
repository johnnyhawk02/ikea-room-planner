import React, { useState, useEffect } from 'react';
import RoomCanvas from './components/RoomCanvas';
import FurnitureSelector from './components/FurnitureSelector';
import RoomSelector from './components/RoomSelector';
import SaveRoomDialog from './components/SaveRoomDialog';
import './App.css';

function App() {
  const [roomDimensions, setRoomDimensions] = useState({
    width: 500,
    length: 400,
  });

  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [showLabels, setShowLabels] = useState(false);
  const [currentFurniture, setCurrentFurniture] = useState([]);
  const [savedRooms, setSavedRooms] = useState([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [currentRoomName, setCurrentRoomName] = useState(null);

  const isDevelopment = process.env.NODE_ENV === 'development';

  // Load saved rooms from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem('savedRooms');
    if (saved) {
      setSavedRooms(JSON.parse(saved));
    }
  }, []);

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
    setCurrentFurniture([]);
  };

  const handleFurnitureChange = (furniture) => {
    setCurrentFurniture(furniture);
  };

  const handleSaveRoom = (name) => {
    const newRoom = {
      name,
      dimensions: roomDimensions,
      furniture: currentFurniture
    };

    const updatedRooms = savedRooms.filter(room => room.name !== name);
    updatedRooms.push(newRoom);
    
    setSavedRooms(updatedRooms);
    localStorage.setItem('savedRooms', JSON.stringify(updatedRooms));
  };

  const handleSaveClick = () => {
    if (currentRoomName) {
      handleSaveRoom(currentRoomName);
    } else {
      setSaveDialogOpen(true);
    }
  };

  const handleSaveAsClick = () => {
    setSaveDialogOpen(true);
  };

  const handleSaveComplete = (name) => {
    handleSaveRoom(name);
    setCurrentRoomName(name);
  };

  const handleLoadRoom = (name) => {
    const room = savedRooms.find(r => r.name === name);
    if (room) {
      setRoomDimensions(room.dimensions);
      setCurrentFurniture(room.furniture);
      setCurrentRoomName(name);
    }
  };

  const handleClearSavedRooms = () => {
    if (window.confirm('Are you sure you want to clear all saved rooms? This cannot be undone.')) {
      localStorage.removeItem('savedRooms');
      setSavedRooms([]);
      setCurrentRoomName(null);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <aside className="w-56 bg-white shadow-lg overflow-y-auto flex-shrink-0">
        <FurnitureSelector onSelect={handleFurnitureSelect} />
      </aside>
      
      <main className="flex-1 p-2 flex flex-col overflow-hidden">
        <div className="bg-white p-2 rounded-lg shadow-sm mb-2 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <RoomSelector
                onLoad={handleLoadRoom}
                savedRooms={savedRooms}
              />
            </div>
            <div className="flex gap-2 ml-2">
              {isDevelopment && (
                <button
                  onClick={handleClearSavedRooms}
                  className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  title="Development only: Clear all saved rooms"
                >
                  🗑️ Clear All
                </button>
              )}
              <button
                onClick={handleSaveClick}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Save{currentRoomName ? ` "${currentRoomName}"` : ''}
              </button>
              <button
                onClick={handleSaveAsClick}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Save As...
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="width" className="block text-xs font-medium text-gray-600 mb-1">Width (cm)</label>
                <input
                  id="width"
                  type="number"
                  value={roomDimensions.width}
                  onChange={(e) => handleDimensionChange('width', e.target.value)}
                  className="w-full rounded border border-gray-300 py-1 px-2 text-sm"
                  min="100"
                  max="1000"
                  step="10"
                />
              </div>
              <div>
                <label htmlFor="length" className="block text-xs font-medium text-gray-600 mb-1">Length (cm)</label>
                <input
                  id="length"
                  type="number"
                  value={roomDimensions.length}
                  onChange={(e) => handleDimensionChange('length', e.target.value)}
                  className="w-full rounded border border-gray-300 py-1 px-2 text-sm"
                  min="100"
                  max="1000"
                  step="10"
                />
              </div>
            </div>
            <div className="flex items-end justify-end gap-2">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="showLabels"
                  checked={showLabels}
                  onChange={(e) => setShowLabels(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor="showLabels" className="text-xs font-medium text-gray-600">
                  Labels
                </label>
              </div>
              <button
                onClick={handleClearRoom}
                className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
          <RoomCanvas
            dimensions={roomDimensions}
            selectedFurniture={selectedFurniture}
            showLabels={showLabels}
            onFurnitureChange={handleFurnitureChange}
            initialFurniture={currentFurniture}
          />
        </div>

        <SaveRoomDialog
          isOpen={saveDialogOpen}
          onClose={() => setSaveDialogOpen(false)}
          onSave={handleSaveComplete}
          savedRooms={savedRooms}
          currentRoom={currentRoomName}
        />
      </main>
    </div>
  );
}

export default App;
