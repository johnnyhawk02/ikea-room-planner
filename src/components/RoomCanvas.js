import React, { useState, useEffect, useRef } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, MouseSensor, TouchSensor } from '@dnd-kit/core';
import FurnitureItem from './FurnitureItem';

const RoomCanvas = ({ dimensions, selectedFurniture, showLabels }) => {
  const [furniture, setFurniture] = useState([]);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );
  
  const CM_TO_PIXELS = 2; // 1cm = 2px for better visibility

  useEffect(() => {
    if (selectedFurniture) {
      if (selectedFurniture.type === 'clear') {
        setFurniture([]);
        return;
      }

      const centerX = (dimensions.width * CM_TO_PIXELS) / 2 - (selectedFurniture.width * CM_TO_PIXELS) / 2;
      const centerY = (dimensions.length * CM_TO_PIXELS) / 2 - (selectedFurniture.length * CM_TO_PIXELS) / 2;
      
      const newFurniture = {
        ...selectedFurniture,
        id: `${selectedFurniture.id}-${Date.now()}`,
        position: { 
          x: centerX,
          y: centerY
        },
        rotation: 0,
        width: selectedFurniture.width * CM_TO_PIXELS,
        length: selectedFurniture.length * CM_TO_PIXELS,
        originalWidth: selectedFurniture.width * CM_TO_PIXELS,
        originalLength: selectedFurniture.length * CM_TO_PIXELS,
        lastRotation: 0
      };
      setFurniture(prev => [...prev, newFurniture]);
    }
  }, [selectedFurniture, dimensions]);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      
      const padding = 80; // Increased padding for better visibility
      const containerWidth = containerRef.current.clientWidth - padding;
      const containerHeight = containerRef.current.clientHeight - padding;
      
      const roomWidth = dimensions.width * CM_TO_PIXELS;
      const roomLength = dimensions.length * CM_TO_PIXELS;
      
      const widthScale = containerWidth / roomWidth;
      const heightScale = containerHeight / roomLength;
      
      // Use the smaller scale to ensure room fits in both dimensions
      // Removed the limit of 1 to allow scaling up
      const newScale = Math.min(widthScale, heightScale);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [dimensions]);

  const getRotatedCorners = (item) => {
    const rad = (item.rotation || 0) * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    
    // Get center point
    const centerX = item.position.x + item.width / 2;
    const centerY = item.position.y + item.length / 2;
    
    // Get corners relative to center
    const w = item.width / 2;
    const h = item.length / 2;
    
    // Calculate rotated corners
    return [
      { // Top-left
        x: centerX + (-w * cos - (-h) * sin),
        y: centerY + (-w * sin + (-h) * cos)
      },
      { // Top-right
        x: centerX + (w * cos - (-h) * sin),
        y: centerY + (w * sin + (-h) * cos)
      },
      { // Bottom-right
        x: centerX + (w * cos - h * sin),
        y: centerY + (w * sin + h * cos)
      },
      { // Bottom-left
        x: centerX + (-w * cos - h * sin),
        y: centerY + (-w * sin + h * cos)
      }
    ];
  };

  const isInsideRoom = (corners, roomDims) => {
    const maxX = roomDims.width * CM_TO_PIXELS;
    const maxY = roomDims.length * CM_TO_PIXELS;
    
    // Check if all corners are within room bounds
    return corners.every(pt => 
      pt.x >= 0 && pt.x <= maxX && 
      pt.y >= 0 && pt.y <= maxY
    );
  };

  const findValidPosition = (item, newRotation, roomDims) => {
    // Get corners at current position with new rotation
    const testItem = {
      ...item,
      rotation: newRotation
    };
    const corners = getRotatedCorners(testItem);
    const maxX = roomDims.width * CM_TO_PIXELS;
    const maxY = roomDims.length * CM_TO_PIXELS;
    
    // If current position works, keep it
    if (isInsideRoom(corners, roomDims)) {
      return item.position;
    }

    // Calculate how far out of bounds we are
    let minAdjustX = 0;
    let minAdjustY = 0;
    let maxAdjustX = 0;
    let maxAdjustY = 0;

    corners.forEach(corner => {
      if (corner.x < 0) minAdjustX = Math.min(minAdjustX, corner.x);
      if (corner.x > maxX) maxAdjustX = Math.max(maxAdjustX, corner.x - maxX);
      if (corner.y < 0) minAdjustY = Math.min(minAdjustY, corner.y);
      if (corner.y > maxY) maxAdjustY = Math.max(maxAdjustY, corner.y - maxY);
    });

    // Calculate new position that brings all corners inside
    return {
      x: item.position.x - minAdjustX - maxAdjustX,
      y: item.position.y - minAdjustY - maxAdjustY
    };
  };

  const handleRotate = (id) => {
    setFurniture(items =>
      items.map(item => {
        if (item.id === id) {
          const newRotation = ((item.rotation || 0) + 90) % 360;
          
          // Find a valid position for the rotated item
          const newPosition = findValidPosition(item, newRotation, dimensions);

          return {
            ...item,
            rotation: newRotation,
            position: newPosition
          };
        }
        return item;
      })
    );
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    if (!active) return;

    setFurniture(items =>
      items.map(item => {
        if (item.id === active.id) {
          // Calculate proposed new position
          const newPosition = {
            x: item.position.x + delta.x,
            y: item.position.y + delta.y
          };

          // Create test item with new position
          const testItem = {
            ...item,
            position: newPosition
          };

          // Get corners of rotated item at new position
          const corners = getRotatedCorners(testItem);

          // Check if new position would be valid
          if (!isInsideRoom(corners, dimensions)) {
            // Try to snap to closest valid position
            const maxX = dimensions.width * CM_TO_PIXELS;
            const maxY = dimensions.length * CM_TO_PIXELS;
            
            // Find the amount we need to adjust by checking how far out of bounds we are
            let adjustX = 0;
            let adjustY = 0;
            
            corners.forEach(corner => {
              if (corner.x < 0) adjustX = Math.max(adjustX, -corner.x);
              if (corner.x > maxX) adjustX = Math.min(adjustX, maxX - corner.x);
              if (corner.y < 0) adjustY = Math.max(adjustY, -corner.y);
              if (corner.y > maxY) adjustY = Math.min(adjustY, maxY - corner.y);
            });

            // Apply the adjustment
            return {
              ...item,
              position: {
                x: newPosition.x + adjustX,
                y: newPosition.y + adjustY
              }
            };
          }

          return {
            ...item,
            position: newPosition
          };
        }
        return item;
      })
    );
  };

  const handleDelete = (id) => {
    setFurniture(items => items.filter(item => item.id !== id));
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 200px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    padding: '40px', // Increased padding to match the calculation
  };

  const canvasStyle = {
    width: dimensions.width * CM_TO_PIXELS,
    height: dimensions.length * CM_TO_PIXELS,
    position: 'relative',
    backgroundColor: '#f8f9fa',
    backgroundImage: `
      linear-gradient(to right, rgba(128, 128, 128, 0.2) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(128, 128, 128, 0.2) 1px, transparent 1px)
    `,
    backgroundSize: `${CM_TO_PIXELS * 10}px ${CM_TO_PIXELS * 10}px`,
    transform: `scale(${scale})`,
    transformOrigin: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    border: '2px solid #dee2e6',
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <DndContext 
        sensors={sensors} 
        onDragEnd={handleDragEnd}
        modifiers={[
          ({transform}) => ({
            ...transform,
            x: transform.x / scale,
            y: transform.y / scale
          })
        ]}
      >
        <div style={canvasStyle} className="room-canvas">
          {/* Grid labels */}
          <div style={{
            position: 'absolute',
            top: '-25px',
            left: '0',
            right: '0',
            textAlign: 'center',
            fontSize: `${14/scale}px`,
            color: '#666',
          }}>
            {dimensions.width}cm
          </div>
          <div style={{
            position: 'absolute',
            left: '-35px',
            top: '50%',
            transform: 'rotate(-90deg)',
            fontSize: `${14/scale}px`,
            color: '#666',
            transformOrigin: 'center',
            whiteSpace: 'nowrap',
          }}>
            {dimensions.length}cm
          </div>
          
          {furniture.map((item) => (
            <FurnitureItem
              key={item.id}
              item={item}
              position={item.position}
              rotation={item.rotation}
              scale={scale}
              showLabels={showLabels}
              onRotate={() => handleRotate(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default RoomCanvas;