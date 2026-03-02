// Pets Kategorisi - Evcil Hayvanlar
// viewBox="0 0 300 300", Kawaii/chibi stil, stroke: #2D3436

export const cat = {
  id: 'cat',
  nameKey: 'animals.cat',
  emoji: '🐱',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M88,188 Q85,145 108,120 Q125,106 150,103 Q175,106 192,120 Q215,145 212,188 Q210,250 150,255 Q90,250 88,188 Z',
      defaultColor: '#FDCB6E',
      label: 'gövde',
    },
    {
      id: 'head',
      path: 'M102,120 Q100,70 150,63 Q200,70 198,120 Q196,140 150,137 Q104,140 102,120 Z',
      defaultColor: '#FDCB6E',
      label: 'kafa',
    },
    {
      id: 'left_ear',
      path: 'M104,84 Q90,52 110,42 Q130,38 133,70 Z',
      defaultColor: '#FDCB6E',
      label: 'sol kulak',
    },
    {
      id: 'right_ear',
      path: 'M196,84 Q210,52 190,42 Q170,38 167,70 Z',
      defaultColor: '#FDCB6E',
      label: 'sağ kulak',
    },
    {
      id: 'tail',
      path: 'M212,195 Q248,168 252,208 Q256,246 232,254 Q215,252 215,228 Q220,210 212,195 Z',
      defaultColor: '#FF9F43',
      label: 'kuyruk',
    },
    {
      id: 'left_eye',
      path: 'M116,108 Q116,92 132,92 Q148,92 148,108 Q148,124 132,124 Q116,124 116,108 Z',
      defaultColor: '#2D3436',
      label: 'sol göz',
    },
    {
      id: 'right_eye',
      path: 'M152,108 Q152,92 168,92 Q184,92 184,108 Q184,124 168,124 Q152,124 152,108 Z',
      defaultColor: '#2D3436',
      label: 'sağ göz',
    },
    {
      id: 'nose',
      path: 'M142,122 L150,132 L158,122 Q150,115 142,122 Z',
      defaultColor: '#FD79A8',
      label: 'burun',
    },
  ],
  outline: 'M88,188 Q85,145 108,120 Q125,106 150,103 Q175,106 192,120 Q215,145 212,188 Q210,250 150,255 Q90,250 88,188 Z',
};

export const PETS_ANIMALS = [cat];
