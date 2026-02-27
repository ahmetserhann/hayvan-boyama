// viewBox="0 0 200 200"

export const roket = {
  id: 'roket',
  nameKey: 'animals.rocket',
  emoji: '🚀',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M80,150 L80,65 Q80,30 100,22 Q120,30 120,65 L120,150 Z',
      defaultColor: '#C7CEEA',
      label: 'gövde',
    },
    {
      id: 2,
      path: 'M80,65 Q80,30 100,22 Q120,30 120,65 Q110,58 100,56 Q90,58 80,65 Z',
      defaultColor: '#FF6B6B',
      label: 'burun',
    },
    {
      id: 3,
      path: 'M80,150 L60,168 L60,150 Z',
      defaultColor: '#FF8FA3',
      label: 'sol kanat',
    },
    {
      id: 4,
      path: 'M120,150 L140,168 L140,150 Z',
      defaultColor: '#FF8FA3',
      label: 'sağ kanat',
    },
    {
      id: 5,
      path: 'M88,85 Q100,78 112,85 Q112,105 100,108 Q88,105 88,85 Z',
      defaultColor: '#AED9E0',
      label: 'pencere',
    },
    {
      id: 6,
      path: 'M88,155 Q100,165 112,155 L108,175 Q100,182 92,175 Z',
      defaultColor: '#FF6B6B',
      label: 'alev',
    },
  ],
  outline: 'M80,150 L80,65 Q80,30 100,22 Q120,30 120,65 L120,150 Z M80,150 L60,168 L60,150 Z M120,150 L140,168 L140,150 Z',
};

export const gezegen = {
  id: 'gezegen',
  nameKey: 'animals.planet',
  emoji: '🪐',
  difficulty: { easy: [1, 2], medium: [1, 2, 3], hard: [1, 2, 3, 4, 5] },
  regions: [
    {
      id: 1,
      path: 'M55,100 Q55,62 100,62 Q145,62 145,100 Q145,138 100,138 Q55,138 55,100 Z',
      defaultColor: '#9B59B6',
      label: 'gezegen',
    },
    {
      id: 2,
      path: 'M18,85 Q18,78 50,88 Q82,95 100,95 Q118,95 150,88 Q182,78 182,85 Q182,92 150,102 Q118,110 100,110 Q82,110 50,102 Q18,92 18,85 Z',
      defaultColor: '#FFD93D',
      label: 'halka',
    },
    {
      id: 3,
      path: 'M72,80 Q82,70 95,76 Q90,88 78,90 Z',
      defaultColor: '#C39BD3',
      label: 'krater sol',
    },
    {
      id: 4,
      path: 'M105,100 Q115,90 125,96 Q120,108 108,110 Z',
      defaultColor: '#C39BD3',
      label: 'krater sağ',
    },
    {
      id: 5,
      path: 'M75,108 Q80,102 88,105 Q86,112 80,114 Z',
      defaultColor: '#C39BD3',
      label: 'krater alt',
    },
  ],
  outline: 'M55,100 Q55,62 100,62 Q145,62 145,100 Q145,138 100,138 Q55,138 55,100 Z',
};

export const astronot = {
  id: 'astronot',
  nameKey: 'animals.astronaut',
  emoji: '👨‍🚀',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M62,95 Q62,58 100,52 Q138,58 138,95 Q138,130 100,138 Q62,130 62,95 Z',
      defaultColor: '#FFFFFF',
      label: 'kask',
    },
    {
      id: 2,
      path: 'M72,82 Q72,68 100,65 Q128,68 128,82 Q128,102 100,106 Q72,102 72,82 Z',
      defaultColor: '#AED9E0',
      label: 'vizör',
    },
    {
      id: 3,
      path: 'M55,138 Q55,118 62,115 Q62,138 62,155 Q55,158 50,150 Z',
      defaultColor: '#FFFFFF',
      label: 'sol kol',
    },
    {
      id: 4,
      path: 'M145,138 Q145,118 138,115 Q138,138 138,155 Q145,158 150,150 Z',
      defaultColor: '#FFFFFF',
      label: 'sağ kol',
    },
    {
      id: 5,
      path: 'M70,138 L70,172 Q70,180 100,182 Q130,180 130,172 L130,138 Q130,120 100,118 Q70,120 70,138 Z',
      defaultColor: '#ECEFF1',
      label: 'gövde',
    },
    {
      id: 6,
      path: 'M85,145 Q100,142 115,145 Q115,158 100,160 Q85,158 85,145 Z',
      defaultColor: '#FF8FA3',
      label: 'göğüs plakası',
    },
  ],
  outline: 'M62,95 Q62,58 100,52 Q138,58 138,95 Q138,130 100,138 Q62,130 62,95 Z M70,138 L70,172 Q70,180 100,182 Q130,180 130,172 L130,138 Z',
};

export const UZAY = [roket, gezegen, astronot];
