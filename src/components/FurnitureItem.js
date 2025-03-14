import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const FurnitureItem = ({ item, position, rotation = 0, scale, onRotate, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
  });

  const style = {
    position: 'absolute',
    width: `${item.width}px`,
    height: `${item.length}px`,
    left: position.x,
    top: position.y,
    backgroundColor: item.color || '#B8B8B8',
    border: '2px solid #666',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'move',
    transform: `${transform ? 
      `translate3d(${transform.x}px, ${transform.y}px, 0) ` : 
      ''}rotate(${rotation}deg)`,
    transformOrigin: 'center',
    transition: transform ? 'none' : 'box-shadow 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    userSelect: 'none',
    touchAction: 'none',
    zIndex: transform ? 1000 : 1,
  };

  const controlsStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    transform: 'translate(50%, -50%)',
    display: 'flex',
    gap: '4px',
    padding: '4px',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 1001,
    transformOrigin: 'center',
  };

  const buttonStyle = {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ddd',
    background: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '16px',
    padding: 0,
    lineHeight: 1,
    transformOrigin: 'center',
    transform: `scale(${1/scale})`,
  };

  const labelStyle = {
    position: 'absolute',
    bottom: '4px',
    left: '50%',
    transform: `translateX(-50%) scale(${1/scale})`,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    transformOrigin: 'center',
  };

  // Real dimensions in cm (without pixel scaling)
  const realWidth = item.width / 2; // Convert back from pixels to cm
  const realLength = item.length / 2;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div 
        style={controlsStyle} 
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          style={buttonStyle}
          onClick={onRotate}
          title="Rotate 90°"
        >
          🔄
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={onDelete}
          title="Delete"
        >
          ❌
        </button>
      </div>
      <div style={labelStyle}>
        {item.name}
        <br />
        <span style={{ fontSize: '10px' }}>
          {realWidth}×{realLength}cm
        </span>
      </div>
    </div>
  );
};

export default FurnitureItem;