import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const FurnitureItem = ({ item, position, rotation = 0, scale, showLabels, onRotate, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
  });

  const style = {
    position: 'absolute',
    width: `${item.width}px`,
    height: `${item.length}px`,
    left: `${position.x}px`,
    top: `${position.y}px`,
    backgroundColor: item.color || '#B8B8B8',
    border: '2px solid #666',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'move',
    transform: transform ? 
      `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${rotation}deg)` : 
      `rotate(${rotation}deg)`,
    transformOrigin: 'center',
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
    pointerEvents: 'all',
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
    transform: `scale(${1/scale})`,
    pointerEvents: 'all',
    touchAction: 'none',
  };

  const labelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%) scale(${1/scale})`,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px', // Increased from 7.2px
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    display: showLabels ? 'block' : 'none',
    textAlign: 'center'
  };

  const realWidth = item.width / 2;
  const realLength = item.length / 2;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div 
        style={controlsStyle} 
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          style={buttonStyle}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRotate();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          title="Rotate 90°"
        >
          🔄
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          title="Delete"
        >
          ❌
        </button>
      </div>
      <div style={labelStyle}>
        {item.name}
        <br />
        <span style={{ fontSize: '10px' }}> {/* Increased from 6px */}
          {realWidth}×{realLength}cm
        </span>
      </div>
    </div>
  );
};

export default FurnitureItem;