// Mini World Kategorisi - Mini Dünya
// viewBox="0 0 300 300", Kawaii/chibi stil, stroke: #2D3436

export const frog = {
  id: 'frog',
  nameKey: 'animals.frog',
  emoji: '🐸',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M80,202 Q78,155 150,145 Q222,155 220,202 Q218,256 150,262 Q82,256 80,202 Z',
      defaultColor: '#55EFC4',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M110,208 Q108,170 150,164 Q192,170 190,208 Q188,250 150,255 Q112,250 110,208 Z',
      defaultColor: '#FAFAFA',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M95,152 Q93,98 150,90 Q207,98 205,152 Q202,165 150,162 Q98,165 95,152 Z',
      defaultColor: '#00B894',
      label: 'kafa',
    },
    {
      id: 'left_eye',
      path: 'M85,108 Q85,80 110,74 Q135,80 135,108 Q135,128 110,130 Q85,128 85,108 Z',
      defaultColor: '#FAFAFA',
      label: 'sol göz',
    },
    {
      id: 'right_eye',
      path: 'M165,108 Q165,80 190,74 Q215,80 215,108 Q215,128 190,130 Q165,128 165,108 Z',
      defaultColor: '#FAFAFA',
      label: 'sağ göz',
    },
    {
      id: 'mouth',
      path: 'M112,150 Q150,165 188,150 Q188,160 150,172 Q112,160 112,150 Z',
      defaultColor: '#2D3436',
      label: 'ağız',
    },
    {
      id: 'front_left_leg',
      path: 'M82,245 Q58,230 50,260 Q50,272 65,275 Q82,272 90,255 Z',
      defaultColor: '#55EFC4',
      label: 'sol ön ayak',
    },
    {
      id: 'front_right_leg',
      path: 'M218,245 Q242,230 250,260 Q250,272 235,275 Q218,272 210,255 Z',
      defaultColor: '#55EFC4',
      label: 'sağ ön ayak',
    },
  ],
  outline: 'M80,202 Q78,155 150,145 Q222,155 220,202 Q218,256 150,262 Q82,256 80,202 Z',
};

export const MINI_WORLD_ANIMALS = [frog];
