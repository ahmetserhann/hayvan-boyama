// Polar World Kategorisi - Kutup Dünyası
// viewBox="0 0 300 300", Kawaii/chibi stil, stroke: #2D3436

export const penguin = {
  id: 'penguin',
  nameKey: 'animals.penguin',
  emoji: '🐧',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M85,188 Q83,138 150,124 Q217,138 215,188 Q213,252 150,258 Q87,252 85,188 Z',
      defaultColor: '#2D3436',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M115,192 Q113,155 150,148 Q187,155 185,192 Q183,242 150,246 Q117,242 115,192 Z',
      defaultColor: '#FAFAFA',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M108,114 Q106,68 150,62 Q194,68 192,114 Q190,134 150,130 Q110,134 108,114 Z',
      defaultColor: '#2D3436',
      label: 'kafa',
    },
    {
      id: 'beak',
      path: 'M138,122 Q137,136 150,142 Q163,136 162,122 Q152,115 138,122 Z',
      defaultColor: '#FDCB6E',
      label: 'gaga',
    },
    {
      id: 'left_wing',
      path: 'M85,168 Q62,150 57,188 Q53,224 83,234 Q97,222 92,196 Z',
      defaultColor: '#2D3436',
      label: 'sol kanat',
    },
    {
      id: 'right_wing',
      path: 'M215,168 Q238,150 243,188 Q247,224 217,234 Q203,222 208,196 Z',
      defaultColor: '#2D3436',
      label: 'sağ kanat',
    },
    {
      id: 'left_eye',
      path: 'M118,104 Q118,88 134,88 Q150,88 150,104 Q150,120 134,120 Q118,120 118,104 Z',
      defaultColor: '#FFFFFF',
      label: 'sol göz',
    },
    {
      id: 'right_eye',
      path: 'M150,104 Q150,88 166,88 Q182,88 182,104 Q182,120 166,120 Q150,120 150,104 Z',
      defaultColor: '#FFFFFF',
      label: 'sağ göz',
    },
  ],
  outline: 'M85,188 Q83,138 150,124 Q217,138 215,188 Q213,252 150,258 Q87,252 85,188 Z',
};

export const POLAR_WORLD_ANIMALS = [penguin];
