// viewBox="0 0 200 200" for all SVGs

export const kedi = {
  id: 'kedi',
  nameKey: 'animals.cat',
  emoji: '🐱',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4, 5], hard: [1, 2, 3, 4, 5, 6, 7] },
  regions: [
    {
      id: 1,
      path: 'M50,80 Q50,50 100,45 Q150,50 150,80 L155,130 Q155,155 100,160 Q45,155 45,130 Z',
      defaultColor: '#FFFFFF',
      label: 'gövde',
    },
    {
      id: 2,
      path: 'M65,48 L55,20 L80,38 Z',
      defaultColor: '#FFFFFF',
      label: 'sol kulak',
    },
    {
      id: 3,
      path: 'M135,48 L145,20 L120,38 Z',
      defaultColor: '#FFFFFF',
      label: 'sağ kulak',
    },
    {
      id: 4,
      path: 'M80,90 Q100,88 120,90 Q120,110 100,112 Q80,110 80,90 Z',
      defaultColor: '#FFCDD2',
      label: 'karna',
    },
    {
      id: 5,
      path: 'M88,100 Q100,97 112,100 Q112,108 100,110 Q88,108 88,100 Z',
      defaultColor: '#F48FB1',
      label: 'burun',
    },
    {
      id: 6,
      path: 'M70,135 Q80,145 100,148 Q120,145 130,135',
      defaultColor: '#FFFFFF',
      label: 'kuyruk bölgesi',
      isOutline: true,
    },
    {
      id: 7,
      path: 'M72,75 Q78,70 84,75 Q78,80 72,75 Z',
      defaultColor: '#42A5F5',
      label: 'sol göz',
    },
    {
      id: 8,
      path: 'M116,75 Q122,70 128,75 Q122,80 116,75 Z',
      defaultColor: '#42A5F5',
      label: 'sağ göz',
    },
  ],
  outline: 'M50,80 Q50,50 100,45 Q150,50 150,80 L155,130 Q155,155 100,160 Q45,155 45,130 Z M65,48 L55,20 L80,38 Z M135,48 L145,20 L120,38 Z',
};

export const kopek = {
  id: 'kopek',
  nameKey: 'animals.dog',
  emoji: '🐶',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4, 5], hard: [1, 2, 3, 4, 5, 6, 7] },
  regions: [
    {
      id: 1,
      path: 'M48,85 Q48,55 100,48 Q152,55 152,85 L155,135 Q155,158 100,162 Q45,158 45,135 Z',
      defaultColor: '#FFFFFF',
      label: 'gövde',
    },
    {
      id: 2,
      path: 'M55,60 Q42,45 38,70 Q40,88 58,88 Z',
      defaultColor: '#FFCC80',
      label: 'sol kulak',
    },
    {
      id: 3,
      path: 'M145,60 Q158,45 162,70 Q160,88 142,88 Z',
      defaultColor: '#FFCC80',
      label: 'sağ kulak',
    },
    {
      id: 4,
      path: 'M80,100 Q100,96 120,100 Q120,118 100,122 Q80,118 80,100 Z',
      defaultColor: '#FFCCBC',
      label: 'karın',
    },
    {
      id: 5,
      path: 'M88,108 Q100,105 112,108 Q110,116 100,118 Q90,116 88,108 Z',
      defaultColor: '#FF8A65',
      label: 'burun',
    },
    {
      id: 6,
      path: 'M72,78 Q78,73 84,78 Q78,83 72,78 Z',
      defaultColor: '#795548',
      label: 'sol göz',
    },
    {
      id: 7,
      path: 'M116,78 Q122,73 128,78 Q122,83 116,78 Z',
      defaultColor: '#795548',
      label: 'sağ göz',
    },
  ],
  outline: 'M48,85 Q48,55 100,48 Q152,55 152,85 L155,135 Q155,158 100,162 Q45,158 45,135 Z',
};

export const tavsan = {
  id: 'tavsan',
  nameKey: 'animals.rabbit',
  emoji: '🐰',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M52,90 Q52,62 100,55 Q148,62 148,90 L148,140 Q148,162 100,165 Q52,162 52,140 Z',
      defaultColor: '#FFFFFF',
      label: 'gövde',
    },
    {
      id: 2,
      path: 'M70,58 Q65,20 80,15 Q88,12 90,55 Z',
      defaultColor: '#FFFFFF',
      label: 'sol kulak',
    },
    {
      id: 3,
      path: 'M130,58 Q135,20 120,15 Q112,12 110,55 Z',
      defaultColor: '#FFFFFF',
      label: 'sağ kulak',
    },
    {
      id: 4,
      path: 'M72,28 Q78,18 82,28 Q78,35 72,28 Z',
      defaultColor: '#F48FB1',
      label: 'sol kulak iç',
    },
    {
      id: 5,
      path: 'M118,28 Q122,18 128,28 Q122,35 118,28 Z',
      defaultColor: '#F48FB1',
      label: 'sağ kulak iç',
    },
    {
      id: 6,
      path: 'M88,108 Q100,104 112,108 Q112,118 100,120 Q88,118 88,108 Z',
      defaultColor: '#FFCDD2',
      label: 'karın',
    },
  ],
  outline: 'M52,90 Q52,62 100,55 Q148,62 148,90 L148,140 Q148,162 100,165 Q52,162 52,140 Z',
};

export const kus = {
  id: 'kus',
  nameKey: 'animals.bird',
  emoji: '🐦',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M60,80 Q60,50 100,42 Q140,50 140,80 Q140,115 100,125 Q60,115 60,80 Z',
      defaultColor: '#FFFFFF',
      label: 'gövde',
    },
    {
      id: 2,
      path: 'M40,90 Q30,75 38,65 Q50,58 62,72 Z',
      defaultColor: '#FFD54F',
      label: 'sol kanat',
    },
    {
      id: 3,
      path: 'M160,90 Q170,75 162,65 Q150,58 138,72 Z',
      defaultColor: '#FFD54F',
      label: 'sağ kanat',
    },
    {
      id: 4,
      path: 'M88,62 Q100,55 112,62 L106,72 Q100,75 94,72 Z',
      defaultColor: '#FF8F00',
      label: 'gaga',
    },
    {
      id: 5,
      path: 'M80,125 Q100,138 120,125 L110,155 Q100,162 90,155 Z',
      defaultColor: '#FFD54F',
      label: 'kuyruk',
    },
    {
      id: 6,
      path: 'M88,68 Q94,63 100,68 Q94,73 88,68 Z',
      defaultColor: '#1A237E',
      label: 'göz',
    },
  ],
  outline: 'M60,80 Q60,50 100,42 Q140,50 140,80 Q140,115 100,125 Q60,115 60,80 Z',
};

export const fil = {
  id: 'fil',
  nameKey: 'animals.elephant',
  emoji: '🐘',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M40,75 Q40,45 100,40 Q160,45 160,75 Q165,115 100,128 Q35,115 40,75 Z',
      defaultColor: '#B0BEC5',
      label: 'gövde',
    },
    {
      id: 2,
      path: 'M45,70 Q22,55 18,80 Q18,100 42,100 Z',
      defaultColor: '#B0BEC5',
      label: 'sol kulak',
    },
    {
      id: 3,
      path: 'M155,70 Q178,55 182,80 Q182,100 158,100 Z',
      defaultColor: '#B0BEC5',
      label: 'sağ kulak',
    },
    {
      id: 4,
      path: 'M88,92 Q100,88 112,92 L108,140 Q100,148 92,140 Z',
      defaultColor: '#90A4AE',
      label: 'hortum',
    },
    {
      id: 5,
      path: 'M75,65 Q82,58 88,65 Q82,72 75,65 Z',
      defaultColor: '#37474F',
      label: 'sol göz',
    },
    {
      id: 6,
      path: 'M112,65 Q118,58 125,65 Q118,72 112,65 Z',
      defaultColor: '#37474F',
      label: 'sağ göz',
    },
  ],
  outline: 'M40,75 Q40,45 100,40 Q160,45 160,75 Q165,115 100,128 Q35,115 40,75 Z',
};

export const aslan = {
  id: 'aslan',
  nameKey: 'animals.lion',
  emoji: '🦁',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6, 7] },
  regions: [
    {
      id: 1,
      path: 'M55,90 Q55,55 100,48 Q145,55 145,90 Q145,130 100,138 Q55,130 55,90 Z',
      defaultColor: '#FFD54F',
      label: 'yüz',
    },
    {
      id: 2,
      path: 'M30,95 Q25,50 55,55 Q55,95 55,95 Q42,100 30,95 Z',
      defaultColor: '#FF8F00',
      label: 'yele sol',
    },
    {
      id: 3,
      path: 'M170,95 Q175,50 145,55 Q145,95 145,95 Q158,100 170,95 Z',
      defaultColor: '#FF8F00',
      label: 'yele sağ',
    },
    {
      id: 4,
      path: 'M55,70 Q42,40 65,35 Q75,38 72,58 Z',
      defaultColor: '#FF8F00',
      label: 'yele üst sol',
    },
    {
      id: 5,
      path: 'M145,70 Q158,40 135,35 Q125,38 128,58 Z',
      defaultColor: '#FF8F00',
      label: 'yele üst sağ',
    },
    {
      id: 6,
      path: 'M78,82 Q85,76 92,82 Q85,88 78,82 Z',
      defaultColor: '#5D4037',
      label: 'sol göz',
    },
    {
      id: 7,
      path: 'M108,82 Q115,76 122,82 Q115,88 108,82 Z',
      defaultColor: '#5D4037',
      label: 'sağ göz',
    },
  ],
  outline: 'M55,90 Q55,55 100,48 Q145,55 145,90 Q145,130 100,138 Q55,130 55,90 Z',
};

export const HAYVANLAR = [kedi, kopek, tavsan, kus, fil, aslan];
