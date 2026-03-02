// Night World Kategorisi - Gece Dünyası
// viewBox="0 0 300 300", Kawaii/chibi stil, stroke: #2D3436

export const raccoon = {
  id: 'raccoon',
  nameKey: 'animals.raccoon',
  emoji: '🦝',
  difficulty: 6,
  regions: [
    {
      id: 'body',
      path: 'M88,190 Q85,148 108,124 Q125,110 150,108 Q175,110 192,124 Q215,148 212,190 Q210,252 150,258 Q90,252 88,190 Z',
      defaultColor: '#B2BEC3',
      label: 'gövde',
    },
    {
      id: 'head',
      path: 'M102,122 Q100,72 150,65 Q200,72 198,122 Q196,142 150,138 Q104,142 102,122 Z',
      defaultColor: '#B2BEC3',
      label: 'kafa',
    },
    {
      id: 'left_ear',
      path: 'M105,78 Q92,50 112,40 Q132,36 133,65 Z',
      defaultColor: '#B2BEC3',
      label: 'sol kulak',
    },
    {
      id: 'right_ear',
      path: 'M195,78 Q208,50 188,40 Q168,36 167,65 Z',
      defaultColor: '#B2BEC3',
      label: 'sağ kulak',
    },
    {
      id: 'left_eye_mask',
      path: 'M104,100 Q102,82 122,78 Q145,80 148,100 Q146,118 128,122 Q106,118 104,100 Z',
      defaultColor: '#2D3436',
      label: 'sol göz maskesi',
    },
    {
      id: 'right_eye_mask',
      path: 'M152,100 Q155,80 178,78 Q198,82 196,100 Q194,118 172,122 Q154,118 152,100 Z',
      defaultColor: '#2D3436',
      label: 'sağ göz maskesi',
    },
    {
      id: 'nose',
      path: 'M138,128 Q138,118 150,116 Q162,118 162,128 Q162,138 150,140 Q138,138 138,128 Z',
      defaultColor: '#FD79A8',
      label: 'burun',
    },
    {
      id: 'tail',
      path: 'M210,198 Q245,172 250,215 Q252,248 228,255 Q212,252 215,228 Q215,210 210,198 Z',
      defaultColor: '#636E72',
      label: 'kuyruk',
    },
  ],
  outline: 'M88,190 Q85,148 108,124 Q125,110 150,108 Q175,110 192,124 Q215,148 212,190 Q210,252 150,258 Q90,252 88,190 Z',
};

export const NIGHT_WORLD_ANIMALS = [raccoon];
