// viewBox="0 0 200 200"

export const prenses = {
  id: 'prenses',
  nameKey: 'animals.princess',
  emoji: '👸',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M72,68 Q72,42 100,38 Q128,42 128,68 Q128,90 100,95 Q72,90 72,68 Z',
      defaultColor: '#FFCC80',
      label: 'yüz',
    },
    {
      id: 2,
      path: 'M60,68 Q55,42 72,38 Q80,35 82,55 Z',
      defaultColor: '#FFB300',
      label: 'sol saç',
    },
    {
      id: 3,
      path: 'M140,68 Q145,42 128,38 Q120,35 118,55 Z',
      defaultColor: '#FFB300',
      label: 'sağ saç',
    },
    {
      id: 4,
      path: 'M55,95 Q55,75 72,78 Q72,110 80,125 L120,125 Q128,110 128,78 Q145,75 145,95 Q145,140 100,148 Q55,140 55,95 Z',
      defaultColor: '#FF6BA8',
      label: 'elbise üst',
    },
    {
      id: 5,
      path: 'M80,125 Q60,130 35,155 L165,155 Q140,130 120,125 Z',
      defaultColor: '#FFD1DC',
      label: 'etek',
    },
    {
      id: 6,
      path: 'M82,38 L82,28 Q82,18 100,15 Q118,18 118,28 L118,38 Z',
      defaultColor: '#FFD93D',
      label: 'taç',
    },
  ],
  outline: 'M72,68 Q72,42 100,38 Q128,42 128,68 Q128,90 100,95 Q72,90 72,68 Z M55,95 Q55,75 72,78 Q72,110 80,125 L120,125 Q128,110 128,78 Q145,75 145,95 Z',
};

export const sato = {
  id: 'sato',
  nameKey: 'animals.castle',
  emoji: '🏰',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M35,160 L35,80 L75,80 L75,160 Z',
      defaultColor: '#C7CEEA',
      label: 'sol kule',
    },
    {
      id: 2,
      path: 'M125,160 L125,80 L165,80 L165,160 Z',
      defaultColor: '#C7CEEA',
      label: 'sağ kule',
    },
    {
      id: 3,
      path: 'M70,160 L70,95 L130,95 L130,160 Z',
      defaultColor: '#B5EAD7',
      label: 'ana gövde',
    },
    {
      id: 4,
      path: 'M35,80 L35,65 L45,65 L45,80 L55,80 L55,65 L65,65 L65,80 L75,80 L75,65 L35,65 Z',
      defaultColor: '#9B59B6',
      label: 'sol kule mazgal',
    },
    {
      id: 5,
      path: 'M125,80 L125,65 L135,65 L135,80 L145,80 L145,65 L155,65 L155,80 L165,80 L165,65 L125,65 Z',
      defaultColor: '#9B59B6',
      label: 'sağ kule mazgal',
    },
    {
      id: 6,
      path: 'M85,160 L85,128 Q85,115 100,112 Q115,115 115,128 L115,160 Z',
      defaultColor: '#795548',
      label: 'kapı',
    },
  ],
  outline: 'M35,160 L35,80 L75,80 L75,160 Z M125,160 L125,80 L165,80 L165,160 Z M70,160 L70,95 L130,95 L130,160 Z',
};

export const tac = {
  id: 'tac',
  nameKey: 'animals.crown',
  emoji: '👑',
  difficulty: { easy: [1, 2], medium: [1, 2, 3], hard: [1, 2, 3, 4, 5] },
  regions: [
    {
      id: 1,
      path: 'M25,145 L25,100 L60,60 L100,90 L140,60 L175,100 L175,145 Z',
      defaultColor: '#FFD93D',
      label: 'taç gövde',
    },
    {
      id: 2,
      path: 'M25,145 L25,130 L175,130 L175,145 Z',
      defaultColor: '#FF8F00',
      label: 'taç alt bant',
    },
    {
      id: 3,
      path: 'M94,88 Q100,78 106,88 Q106,100 100,104 Q94,100 94,88 Z',
      defaultColor: '#FF6B6B',
      label: 'orta taş',
    },
    {
      id: 4,
      path: 'M55,108 Q62,100 68,108 Q68,118 62,121 Q55,118 55,108 Z',
      defaultColor: '#4D96FF',
      label: 'sol taş',
    },
    {
      id: 5,
      path: 'M132,108 Q138,100 145,108 Q145,118 138,121 Q132,118 132,108 Z',
      defaultColor: '#6BCB77',
      label: 'sağ taş',
    },
  ],
  outline: 'M25,145 L25,100 L60,60 L100,90 L140,60 L175,100 L175,145 Z',
};

export const PRENSES = [prenses, sato, tac];
