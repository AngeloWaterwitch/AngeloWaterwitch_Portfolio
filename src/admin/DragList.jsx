import React, { useState } from 'react';

function DragList({ items, onReorder, renderItem }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const handleDragStart = (i) => {
    setDragIndex(i);
  };

  const handleDragOver = (e, i) => {
    e.preventDefault();
    setOverIndex(i);
  };

  const handleDrop = (i) => {
    if (dragIndex !== null && dragIndex !== i) {
      const arr = [...items];
      const [moved] = arr.splice(dragIndex, 1);
      arr.splice(i, 0, moved);
      onReorder(arr);
    }
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      {items.map((item, i) => (
        <div
          key={item.id || i}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={e => handleDragOver(e, i)}
          onDrop={() => handleDrop(i)}
          onDragEnd={handleDragEnd}
          style={{
            background: dragIndex === i ? 'var(--dark4)' : 'var(--dark3)',
            border: '1px solid ' + (overIndex === i && dragIndex !== i ? 'var(--cr-light)' : 'var(--dark4)'),
            borderStyle: overIndex === i && dragIndex !== i ? 'dashed' : 'solid',
            borderRadius: '2px',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            cursor: 'grab',
            opacity: dragIndex === i ? 0.5 : 1,
            transition: 'border-color 0.15s',
            userSelect: 'none',
          }}
        >
          <span style={{ color: '#444', fontSize: '1.2rem', flexShrink: 0 }}>⠿</span>
          {renderItem(item, i)}
        </div>
      ))}
    </div>
  );
}

export default DragList;