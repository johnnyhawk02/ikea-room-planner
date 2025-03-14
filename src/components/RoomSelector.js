import React from 'react';

const RoomSelector = ({ onLoad, savedRooms }) => {
  return (
    <div>
      <label htmlFor="roomSelect" className="block text-xs font-medium text-gray-600 mb-1">
        Load Room
      </label>
      <select
        id="roomSelect"
        onChange={(e) => e.target.value && onLoad(e.target.value)}
        className="w-full rounded border border-gray-300 py-1 px-2 text-sm bg-white"
        defaultValue=""
      >
        <option value="">Select saved room</option>
        {savedRooms.map(room => (
          <option key={room.name} value={room.name}>{room.name}</option>
        ))}
      </select>
    </div>
  );
};

export default RoomSelector;