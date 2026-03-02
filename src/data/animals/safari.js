// Safari Kategorisi
// viewBox="0 0 300 300", Kawaii/chibi stil, stroke: #2D3436

export const hippo = {
  id: 'hippo',
  nameKey: 'animals.hippo',
  emoji: '🦛',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M78,200 Q75,155 150,142 Q225,155 222,200 Q220,255 150,262 Q80,255 78,200 Z',
      defaultColor: '#A29BFE',
      label: 'gövde',
    },
    {
      id: 'head',
      path: 'M85,152 Q82,88 150,78 Q218,88 215,152 Q213,172 150,168 Q87,172 85,152 Z',
      defaultColor: '#A29BFE',
      label: 'kafa',
    },
    {
      id: 'left_ear',
      path: 'M98,88 Q98,68 115,65 Q132,68 132,88 Q132,102 115,105 Q98,102 98,88 Z',
      defaultColor: '#D6A2E8',
      label: 'sol kulak',
    },
    {
      id: 'right_ear',
      path: 'M168,88 Q168,68 185,65 Q202,68 202,88 Q202,102 185,105 Q168,102 168,88 Z',
      defaultColor: '#D6A2E8',
      label: 'sağ kulak',
    },
    {
      id: 'snout',
      path: 'M105,142 Q105,125 150,120 Q195,125 195,142 Q195,165 150,168 Q105,165 105,142 Z',
      defaultColor: '#D6A2E8',
      label: 'burun',
    },
    {
      id: 'left_eye',
      path: 'M108,112 Q108,98 122,98 Q136,98 136,112 Q136,126 122,126 Q108,126 108,112 Z',
      defaultColor: '#2D3436',
      label: 'sol göz',
    },
    {
      id: 'right_eye',
      path: 'M164,112 Q164,98 178,98 Q192,98 192,112 Q192,126 178,126 Q164,126 164,112 Z',
      defaultColor: '#2D3436',
      label: 'sağ göz',
    },
  ],
  outline: 'M78,200 Q75,155 150,142 Q225,155 222,200 Q220,255 150,262 Q80,255 78,200 Z',
};

export const SAFARI_ANIMALS = [hippo];
