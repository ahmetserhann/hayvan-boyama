// viewBox="0 0 200 200"

export const elma = {
  id: 'elma',
  nameKey: 'animals.apple',
  emoji: '🍎',
  difficulty: { easy: [1, 2], medium: [1, 2, 3], hard: [1, 2, 3, 4, 5] },
  regions: [
    {
      id: 1,
      path: 'M50,80 Q45,45 75,35 Q100,28 125,35 Q155,45 150,80 Q155,130 100,155 Q45,130 50,80 Z',
      defaultColor: '#FF6B6B',
      label: 'elma gövde',
    },
    {
      id: 2,
      path: 'M95,35 Q90,20 100,12 Q110,8 112,22 Q108,32 100,35 Z',
      defaultColor: '#4CAF50',
      label: 'sap',
    },
    {
      id: 3,
      path: 'M100,22 Q118,15 125,25 Q118,40 105,38 Z',
      defaultColor: '#66BB6A',
      label: 'yaprak',
    },
    {
      id: 4,
      path: 'M72,65 Q85,58 90,70 Q85,82 72,78 Z',
      defaultColor: '#FFCDD2',
      label: 'sol parlaklık',
    },
    {
      id: 5,
      path: 'M95,55 Q105,50 108,60 Q105,68 95,65 Z',
      defaultColor: '#FFCDD2',
      label: 'sağ parlaklık',
    },
  ],
  outline: 'M50,80 Q45,45 75,35 Q100,28 125,35 Q155,45 150,80 Q155,130 100,155 Q45,130 50,80 Z',
};

export const pasta = {
  id: 'pasta',
  nameKey: 'animals.cake',
  emoji: '🎂',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M30,130 L30,100 Q30,88 100,88 Q170,88 170,100 L170,130 Q170,155 100,158 Q30,155 30,130 Z',
      defaultColor: '#FFB7B2',
      label: 'alt kat',
    },
    {
      id: 2,
      path: 'M55,100 L55,70 Q55,58 100,58 Q145,58 145,70 L145,100 Q145,90 100,90 Q55,90 55,100 Z',
      defaultColor: '#B5EAD7',
      label: 'üst kat',
    },
    {
      id: 3,
      path: 'M30,100 Q30,88 100,88 Q170,88 170,100 Q170,112 100,112 Q30,112 30,100 Z',
      defaultColor: '#FFFFFF',
      label: 'krem alt',
    },
    {
      id: 4,
      path: 'M55,70 Q55,58 100,58 Q145,58 145,70 Q145,82 100,82 Q55,82 55,70 Z',
      defaultColor: '#FFFFFF',
      label: 'krem üst',
    },
    {
      id: 5,
      path: 'M90,58 L90,38 Q90,28 100,25 Q110,28 110,38 L110,58 Z',
      defaultColor: '#FFD93D',
      label: 'mum',
    },
    {
      id: 6,
      path: 'M97,28 Q100,18 103,28 Q103,35 100,38 Q97,35 97,28 Z',
      defaultColor: '#FF6B6B',
      label: 'alev',
    },
  ],
  outline: 'M30,130 L30,100 Q30,88 100,88 Q170,88 170,100 L170,130 Q170,155 100,158 Q30,155 30,130 Z M55,100 L55,70 Q55,58 100,58 Q145,58 145,70 L145,100 Z',
};

export const cilek = {
  id: 'cilek',
  nameKey: 'animals.strawberry',
  emoji: '🍓',
  difficulty: { easy: [1, 2], medium: [1, 2, 3], hard: [1, 2, 3, 4, 5] },
  regions: [
    {
      id: 1,
      path: 'M50,80 Q50,45 100,40 Q150,45 150,80 Q152,130 100,158 Q48,130 50,80 Z',
      defaultColor: '#FF6B6B',
      label: 'çilek gövde',
    },
    {
      id: 2,
      path: 'M72,42 Q65,22 80,18 Q90,16 95,35 Z',
      defaultColor: '#4CAF50',
      label: 'sol yaprak',
    },
    {
      id: 3,
      path: 'M128,42 Q135,22 120,18 Q110,16 105,35 Z',
      defaultColor: '#4CAF50',
      label: 'sağ yaprak',
    },
    {
      id: 4,
      path: 'M92,38 Q95,22 100,18 Q105,22 108,38 Q104,42 100,44 Q96,42 92,38 Z',
      defaultColor: '#4CAF50',
      label: 'orta yaprak',
    },
    {
      id: 5,
      path: 'M75,80 Q100,75 125,80 Q130,115 100,138 Q70,115 75,80 Z',
      defaultColor: '#FFCDD2',
      label: 'benyler bölgesi',
    },
  ],
  outline: 'M50,80 Q50,45 100,40 Q150,45 150,80 Q152,130 100,158 Q48,130 50,80 Z',
};

export const YIYECEKLER = [elma, pasta, cilek];
