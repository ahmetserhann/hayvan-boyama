// viewBox="0 0 200 200"

export const araba = {
  id: 'araba',
  nameKey: 'animals.car',
  emoji: '🚗',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M20,120 L20,90 Q20,80 30,80 L80,80 L110,50 L160,50 Q175,50 180,65 L180,120 Z',
      defaultColor: '#FF6B6B',
      label: 'gövde',
    },
    {
      id: 2,
      path: 'M85,80 L115,55 L158,55 Q170,55 175,68 L175,80 Z',
      defaultColor: '#AED9E0',
      label: 'ön cam',
    },
    {
      id: 3,
      path: 'M22,120 L22,105 L55,105 L55,120 Z',
      defaultColor: '#FFCC80',
      label: 'far sol',
    },
    {
      id: 4,
      path: 'M178,120 L178,105 L155,105 L155,120 Z',
      defaultColor: '#FFCC80',
      label: 'far sağ',
    },
    {
      id: 5,
      path: 'M55,148 Q55,125 75,125 Q95,125 95,148 Q95,165 75,165 Q55,165 55,148 Z',
      defaultColor: '#37474F',
      label: 'ön tekerlek',
    },
    {
      id: 6,
      path: 'M120,148 Q120,125 140,125 Q160,125 160,148 Q160,165 140,165 Q120,165 120,148 Z',
      defaultColor: '#37474F',
      label: 'arka tekerlek',
    },
  ],
  outline: 'M20,120 L20,90 Q20,80 30,80 L80,80 L110,50 L160,50 Q175,50 180,65 L180,120 Z',
};

export const ucak = {
  id: 'ucak',
  nameKey: 'animals.plane',
  emoji: '✈️',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M20,95 Q20,85 35,82 L145,82 Q165,82 175,95 Q165,108 145,108 L35,108 Q20,105 20,95 Z',
      defaultColor: '#C7CEEA',
      label: 'gövde',
    },
    {
      id: 2,
      path: 'M60,82 L60,50 Q60,35 80,35 Q90,35 92,50 L92,82 Z',
      defaultColor: '#B5EAD7',
      label: 'sol kanat',
    },
    {
      id: 3,
      path: 'M60,108 L60,140 Q60,155 80,155 Q90,155 92,140 L92,108 Z',
      defaultColor: '#B5EAD7',
      label: 'sağ kanat',
    },
    {
      id: 4,
      path: 'M145,82 L145,65 Q145,55 158,55 Q165,55 165,65 L165,82 Z',
      defaultColor: '#FFD1DC',
      label: 'sol kuyruk kanadı',
    },
    {
      id: 5,
      path: 'M145,108 L145,125 Q145,135 158,135 Q165,135 165,125 L165,108 Z',
      defaultColor: '#FFD1DC',
      label: 'sağ kuyruk kanadı',
    },
    {
      id: 6,
      path: 'M40,86 Q55,82 70,86 L70,104 Q55,108 40,104 Z',
      defaultColor: '#AED9E0',
      label: 'pencere',
    },
  ],
  outline: 'M20,95 Q20,85 35,82 L145,82 Q165,82 175,95 Q165,108 145,108 L35,108 Q20,105 20,95 Z',
};

export const gemi = {
  id: 'gemi',
  nameKey: 'animals.ship',
  emoji: '🚢',
  difficulty: { easy: [1, 2], medium: [1, 2, 3, 4], hard: [1, 2, 3, 4, 5, 6] },
  regions: [
    {
      id: 1,
      path: 'M25,120 L35,90 L165,90 L175,120 Q175,145 100,150 Q25,145 25,120 Z',
      defaultColor: '#4D96FF',
      label: 'gövde',
    },
    {
      id: 2,
      path: 'M55,90 L55,55 L145,55 L145,90 Z',
      defaultColor: '#FFFFFF',
      label: 'üst yapı',
    },
    {
      id: 3,
      path: 'M75,55 L75,30 L125,30 L125,55 Z',
      defaultColor: '#FF6B6B',
      label: 'köprü',
    },
    {
      id: 4,
      path: 'M90,30 L90,15 Q90,8 100,8 Q110,8 110,15 L110,30 Z',
      defaultColor: '#FFD93D',
      label: 'baca',
    },
    {
      id: 5,
      path: 'M65,70 Q80,65 95,70 L95,82 Q80,85 65,82 Z',
      defaultColor: '#AED9E0',
      label: 'sol pencere',
    },
    {
      id: 6,
      path: 'M105,70 Q120,65 135,70 L135,82 Q120,85 105,82 Z',
      defaultColor: '#AED9E0',
      label: 'sağ pencere',
    },
  ],
  outline: 'M25,120 L35,90 L165,90 L175,120 Q175,145 100,150 Q25,145 25,120 Z',
};

export const ARACLAR = [araba, ucak, gemi];
