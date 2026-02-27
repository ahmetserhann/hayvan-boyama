// viewBox="0 0 200 200"

export const agac = {
  id: 'agac',
  nameKey: 'animals.tree',
  emoji: '🌳',
  difficulty: { easy: [1, 2], medium: [1, 2, 3], hard: [1, 2, 3, 4, 5] },
  regions: [
    {
      id: 1,
      path: 'M85,155 L85,100 L115,100 L115,155 Z',
      defaultColor: '#795548',
      label: 'gövde',
    },
    {
      id: 2,
      path: 'M30,120 Q30,75 100,65 Q170,75 170,120 Q170,155 100,158 Q30,155 30,120 Z',
      defaultColor: '#4CAF50',
      label: 'alt taç',
    },
    {
      id: 3,
      path: 'M45,100 Q45,62 100,52 Q155,62 155,100 Q155,128 100,132 Q45,128 45,100 Z',
      defaultColor: '#66BB6A',
      label: 'orta taç',
    },
    {
      id: 4,
      path: 'M60,82 Q60,48 100,38 Q140,48 140,82 Q140,108 100,112 Q60,108 60,82 Z',
      defaultColor: '#81C784',
      label: 'üst taç',
    },
    {
      id: 5,
      path: 'M80,62 Q80,35 100,28 Q120,35 120,62 Q120,80 100,84 Q80,80 80,62 Z',
      defaultColor: '#A5D6A7',
      label: 'tepe',
    },
  ],
  outline: 'M85,155 L85,100 L115,100 L115,155 Z M30,120 Q30,75 100,65 Q170,75 170,120 Q170,155 100,158 Q30,155 30,120 Z',
};

export const cicek = {
  id: 'cicek',
  nameKey: 'animals.flower',
  emoji: '🌸',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M93,95 L93,165 Q93,172 100,172 Q107,172 107,165 L107,95 Z',
      defaultColor: '#4CAF50',
      label: 'sap',
    },
    {
      id: 2,
      path: 'M75,65 Q68,45 80,38 Q92,35 100,52 Q108,35 120,38 Q132,45 125,65 Q115,80 100,82 Q85,80 75,65 Z',
      defaultColor: '#FF6BA8',
      label: 'yapraklar',
    },
    {
      id: 3,
      path: 'M100,52 Q85,40 80,52 Q85,65 100,65 Q115,65 120,52 Q115,40 100,52 Z',
      defaultColor: '#FFD93D',
      label: 'merkez',
    },
    {
      id: 4,
      path: 'M88,105 Q78,95 82,85 Q90,80 98,90 Z',
      defaultColor: '#66BB6A',
      label: 'sol yaprak',
    },
    {
      id: 5,
      path: 'M112,105 Q122,95 118,85 Q110,80 102,90 Z',
      defaultColor: '#66BB6A',
      label: 'sağ yaprak',
    },
  ],
  outline: 'M93,95 L93,165 Q93,172 100,172 Q107,172 107,165 L107,95 Z M75,65 Q68,45 80,38 Q92,35 100,52 Q108,35 120,38 Q132,45 125,65 Q115,80 100,82 Q85,80 75,65 Z',
};

export const gunes = {
  id: 'gunes',
  nameKey: 'animals.sun',
  emoji: '☀️',
  difficulty: { easy: [1, 2], medium: [1, 2, 3], hard: [1, 2, 3, 4] },
  regions: [
    {
      id: 1,
      path: 'M65,100 Q65,65 100,65 Q135,65 135,100 Q135,135 100,135 Q65,135 65,100 Z',
      defaultColor: '#FFD93D',
      label: 'güneş merkezi',
    },
    {
      id: 2,
      path: 'M96,65 L92,45 L100,38 L108,45 L104,65 Z M135,100 L155,96 L162,100 L155,104 L135,100 Z M104,135 L108,155 L100,162 L92,155 L96,135 Z M65,100 L45,104 L38,100 L45,96 L65,100 Z M122,78 L138,65 L145,72 L132,85 L122,78 Z M122,122 L132,135 L125,142 L112,128 L122,122 Z M78,122 L68,135 L75,142 L88,128 L78,122 Z M78,78 L68,65 L75,58 L88,72 L78,78 Z',
      defaultColor: '#FFB300',
      label: 'ışınlar',
    },
    {
      id: 3,
      path: 'M82,92 Q88,86 96,90 Q96,98 88,100 Q80,98 82,92 Z M104,92 Q110,86 118,90 Q118,98 110,100 Q102,98 104,92 Z',
      defaultColor: '#FF8F00',
      label: 'yüz',
    },
    {
      id: 4,
      path: 'M88,108 Q100,118 112,108',
      defaultColor: '#FF6F00',
      label: 'gülümseme',
    },
  ],
  outline: 'M65,100 Q65,65 100,65 Q135,65 135,100 Q135,135 100,135 Q65,135 65,100 Z',
};

export const DOGA = [agac, cicek, gunes];
