import React, { useState } from 'react';

const SaveRoomDialog = ({ isOpen, onClose, onSave, savedRooms, currentRoom = null }) => {
  const [roomName, setRoomName] = useState(currentRoom || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!roomName.trim()) {
      setError('Please enter a room name');
      return;
    }

    const exists = savedRooms.some(room => room.name === roomName);
    if (exists && roomName !== currentRoom) {
      setError('A room with this name already exists');
      return;
    }

    onSave(roomName);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-96 shadow-xl">
        <h3 className="text-lg font-semibold mb-4">
          {currentRoom ? 'Save Room' : 'Save Room As'}
        </h3>
        <div className="mb-4">
          <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
            Room Name
          </label>
          <input
            id="roomName"
            type="text"
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
              setError('');
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter room name"
            autoFocus
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveRoomDialog;