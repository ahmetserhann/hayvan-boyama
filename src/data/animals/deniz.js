// viewBox="0 0 200 200"

export const balik = {
  id: 'balik',
  nameKey: 'animals.fish',
  emoji: '🐟',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5] },
  regions: [
    {
      id: 1,
      path: 'M40,100 Q40,68 85,65 Q130,62 155,100 Q130,138 85,135 Q40,132 40,100 Z',
      defaultColor: '#4D96FF',
      label: 'gövde',
    },
    {
      id: 2,
      path: 'M155,100 L180,72 L185,100 L180,128 Z',
      defaultColor: '#2979FF',
      label: 'kuyruk',
    },
    {
      id: 3,
      path: 'M80,65 Q100,48 115,58 Q105,68 85,68 Z',
      defaultColor: '#82B1FF',
      label: 'üst yüzgeç',
    },
    {
      id: 4,
      path: 'M80,135 Q100,152 115,142 Q105,132 85,132 Z',
      defaultColor: '#82B1FF',
      label: 'alt yüzgeç',
    },
    {
      id: 5,
      path: 'M62,92 Q70,85 78,92 Q70,99 62,92 Z',
      defaultColor: '#FFFFFF',
      label: 'göz',
    },
  ],
  outline: 'M40,100 Q40,68 85,65 Q130,62 155,100 Q130,138 85,135 Q40,132 40,100 Z M155,100 L180,72 L185,100 L180,128 Z',
};

export const ahtapot = {
  id: 'ahtapot',
  nameKey: 'animals.octopus',
  emoji: '🐙',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M45,85 Q45,42 100,38 Q155,42 155,85 Q155,118 100,122 Q45,118 45,85 Z',
      defaultColor: '#FF6BA8',
      label: 'kafa',
    },
    {
      id: 2,
      path: 'M55,118 Q48,135 45,155 Q50,162 58,155 Q60,138 65,122 Z M75,120 Q72,140 70,160 Q76,166 82,160 Q82,140 80,120 Z M95,122 Q95,142 95,162 Q100,168 105,162 Q105,142 105,122 Z M115,120 Q118,140 120,160 Q126,166 130,160 Q128,140 125,120 Z M135,118 Q142,135 145,155 Q150,162 158,155 Q155,138 145,122 Z',
      defaultColor: '#FF8FA3',
      label: 'kollar',
    },
    {
      id: 3,
      path: 'M78,75 Q85,68 92,75 Q85,82 78,75 Z',
      defaultColor: '#FFFFFF',
      label: 'sol göz',
    },
    {
      id: 4,
      path: 'M108,75 Q115,68 122,75 Q115,82 108,75 Z',
      defaultColor: '#FFFFFF',
      label: 'sağ göz',
    },
    {
      id: 5,
      path: 'M90,95 Q100,102 110,95',
      defaultColor: '#C2185B',
      label: 'ağız',
    },
  ],
  outline: 'M45,85 Q45,42 100,38 Q155,42 155,85 Q155,118 100,122 Q45,118 45,85 Z',
};

export const kaplumbaga = {
  id: 'kaplumbaga',
  nameKey: 'animals.turtle',
  emoji: '🐢',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M45,100 Q45,60 100,55 Q155,60 155,100 Q155,140 100,145 Q45,140 45,100 Z',
      defaultColor: '#4CAF50',
      label: 'kabuk',
    },
    {
      id: 2,
      path: 'M65,78 Q80,68 100,66 Q120,68 135,78 Q135,100 100,105 Q65,100 65,78 Z',
      defaultColor: '#2E7D32',
      label: 'kabuk deseni',
    },
    {
      id: 3,
      path: 'M45,90 L22,80 Q15,78 18,90 Q20,102 42,100 Z',
      defaultColor: '#66BB6A',
      label: 'sol ön ayak',
    },
    {
      id: 4,
      path: 'M155,90 L178,80 Q185,78 182,90 Q180,102 158,100 Z',
      defaultColor: '#66BB6A',
      label: 'sağ ön ayak',
    },
    {
      id: 5,
      path: 'M60,140 L42,155 Q38,162 48,165 Q58,162 65,150 Z',
      defaultColor: '#66BB6A',
      label: 'sol arka ayak',
    },
    {
      id: 6,
      path: 'M140,140 L158,155 Q162,162 152,165 Q142,162 135,150 Z',
      defaultColor: '#66BB6A',
      label: 'sağ arka ayak',
    },
  ],
  outline: 'M45,100 Q45,60 100,55 Q155,60 155,100 Q155,140 100,145 Q45,140 45,100 Z',
};

export const DENIZ = [balik, ahtapot, kaplumbaga];
