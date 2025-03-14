export const furnitureCatalog = {
  shelves: {
    name: "Shelves",
    variants: [
      // KALLAX variants
      {
        id: 'kallax-3x4-upright',
        name: 'KALLAX 3×4 (Upright)',
        type: 'shelf',
        width: 112,
        length: 39,
        height: 147,
        color: '#ffffff',
        orientation: 'upright'
      },
      {
        id: 'kallax-3x4-horizontal',
        name: 'KALLAX 3×4 (Horizontal)',
        type: 'shelf',
        width: 147,
        length: 39,
        height: 112,
        color: '#ffffff',
        orientation: 'horizontal'
      },
      {
        id: 'kallax-2x4-upright',
        name: 'KALLAX 2×4 (Upright)',
        type: 'shelf',
        width: 77,
        length: 39,
        height: 147,
        color: '#ffffff',
        orientation: 'upright'
      },
      {
        id: 'kallax-2x4-horizontal',
        name: 'KALLAX 2×4 (Horizontal)',
        type: 'shelf',
        width: 147,
        length: 39,
        height: 77,
        color: '#ffffff',
        orientation: 'horizontal'
      },
      {
        id: 'kallax-1x4-upright',
        name: 'KALLAX 1×4 (Upright)',
        type: 'shelf',
        width: 42,
        length: 39,
        height: 147,
        color: '#ffffff',
        orientation: 'upright'
      },
      {
        id: 'kallax-1x4-horizontal',
        name: 'KALLAX 1×4 (Horizontal)',
        type: 'shelf',
        width: 147,
        length: 39,
        height: 42,
        color: '#ffffff',
        orientation: 'horizontal'
      }
    ]
  },
  desks: {
    name: "Desks",
    variants: [
      {
        id: 'pahl-standard',
        name: 'PÅHL Desk',
        type: 'desk',
        width: 128,
        length: 58,
        height: 75,
        color: '#ffffff',
        adjustable: true
      },
      {
        id: 'pahl-small',
        name: 'PÅHL Small Desk',
        type: 'desk',
        width: 96,
        length: 58,
        height: 75,
        color: '#ffffff',
        adjustable: true
      },
      {
        id: 'pahl-corner-right',
        name: 'PÅHL Corner Desk (Right)',
        type: 'desk',
        width: 128,
        length: 58,
        height: 75,
        color: '#ffffff',
        adjustable: true,
        corner: 'right'
      },
      {
        id: 'pahl-corner-left',
        name: 'PÅHL Corner Desk (Left)',
        type: 'desk',
        width: 128,
        length: 58,
        height: 75,
        color: '#ffffff',
        adjustable: true,
        corner: 'left'
      }
    ]
  }
};