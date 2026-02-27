// GDD - Forest Friends Kategorisi (Orman Dostları)

export const bear = {
  id: 'bear',
  nameKey: 'animals.bear',
  emoji: '🐻',
  difficulty: 4,
  regions: [
    {
      id: 'body',
      path: 'M80,145 Q80,98 150,92 Q220,98 220,145 Q220,200 150,205 Q80,200 80,145 Z',
      defaultColor: '#8B5E3C',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M112,148 Q112,122 150,118 Q188,122 188,148 Q188,172 150,176 Q112,172 112,148 Z',
      defaultColor: '#C49A6C',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M112,92 Q112,55 150,50 Q188,55 188,92 Q188,110 165,114 Q135,114 112,92 Z',
      defaultColor: '#8B5E3C',
      label: 'baş',
    },
    {
      id: 'ear_l',
      path: 'M112,68 Q98,50 105,68 Q108,78 120,75 Z',
      defaultColor: '#8B5E3C',
      label: 'sol kulak',
    },
    {
      id: 'ear_l_inner',
      path: 'M112,68 Q102,56 107,68 Q110,74 118,72 Z',
      defaultColor: '#FFB3C1',
      label: 'sol kulak iç',
    },
    {
      id: 'ear_r',
      path: 'M188,68 Q202,50 195,68 Q192,78 180,75 Z',
      defaultColor: '#8B5E3C',
      label: 'sağ kulak',
    },
    {
      id: 'ear_r_inner',
      path: 'M188,68 Q198,56 193,68 Q190,74 182,72 Z',
      defaultColor: '#FFB3C1',
      label: 'sağ kulak iç',
    },
    {
      id: 'snout',
      path: 'M132,88 Q132,103 150,106 Q168,103 168,88 Q168,78 150,76 Q132,78 132,88 Z',
      defaultColor: '#C49A6C',
      label: 'burun',
    },
    {
      id: 'nose',
      path: 'M143,82 Q143,88 150,89 Q157,88 157,82 Q157,77 150,76 Q143,77 143,82 Z',
      defaultColor: '#2D3436',
      label: 'burun deliği',
    },
  ],
};

export const fox = {
  id: 'fox',
  nameKey: 'animals.fox',
  emoji: '🦊',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M85,148 Q88,102 150,96 Q212,102 215,148 Q212,200 150,205 Q88,200 85,148 Z',
      defaultColor: '#E17055',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M115,150 Q115,128 150,124 Q185,128 185,150 Q185,170 150,174 Q115,170 115,150 Z',
      defaultColor: '#FFFFFF',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M112,96 Q112,58 150,53 Q188,58 188,96 Q188,114 165,118 Q135,118 112,96 Z',
      defaultColor: '#E17055',
      label: 'baş',
    },
    {
      id: 'face_white',
      path: 'M128,90 Q128,108 150,112 Q172,108 172,90 Q172,78 150,76 Q128,78 128,90 Z',
      defaultColor: '#FFFFFF',
      label: 'yüz beyaz',
    },
    {
      id: 'ear_l',
      path: 'M112,70 Q102,35 120,45 Q128,58 120,70 Z',
      defaultColor: '#E17055',
      label: 'sol kulak',
    },
    {
      id: 'ear_l_inner',
      path: 'M113,68 Q106,42 120,50 Q125,60 119,68 Z',
      defaultColor: '#2D3436',
      label: 'sol kulak iç',
    },
    {
      id: 'ear_r',
      path: 'M188,70 Q198,35 180,45 Q172,58 180,70 Z',
      defaultColor: '#E17055',
      label: 'sağ kulak',
    },
    {
      id: 'ear_r_inner',
      path: 'M187,68 Q194,42 180,50 Q175,60 181,68 Z',
      defaultColor: '#2D3436',
      label: 'sağ kulak iç',
    },
    {
      id: 'tail',
      path: 'M212,148 Q248,128 258,155 Q248,182 218,175 Z',
      defaultColor: '#E17055',
      label: 'kuyruk',
    },
    {
      id: 'tail_tip',
      path: 'M248,148 Q262,138 265,155 Q262,172 250,168 Z',
      defaultColor: '#FFFFFF',
      label: 'kuyruk ucu',
    },
  ],
};

export const owl = {
  id: 'owl',
  nameKey: 'animals.owl',
  emoji: '🦉',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M90,148 Q92,105 150,100 Q208,105 210,148 Q208,205 150,210 Q92,205 90,148 Z',
      defaultColor: '#8B6914',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M115,150 Q115,125 150,120 Q185,125 185,150 Q185,175 150,180 Q115,175 115,150 Z',
      defaultColor: '#F5DEB3',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M110,100 Q110,60 150,55 Q190,60 190,100 Q190,118 165,122 Q135,122 110,100 Z',
      defaultColor: '#8B6914',
      label: 'baş',
    },
    {
      id: 'eye_l',
      path: 'M118,88 Q118,68 138,66 Q158,68 158,88 Q158,105 138,107 Q118,105 118,88 Z',
      defaultColor: '#FFFFFF',
      label: 'sol göz',
    },
    {
      id: 'eye_r',
      path: 'M142,88 Q142,68 162,66 Q182,68 182,88 Q182,105 162,107 Q142,105 142,88 Z',
      defaultColor: '#FFFFFF',
      label: 'sağ göz',
    },
    {
      id: 'pupil_l',
      path: 'M126,88 Q126,78 136,77 Q146,78 146,88 Q146,98 136,99 Q126,98 126,88 Z',
      defaultColor: '#2D3436',
      label: 'sol göz bebeği',
    },
    {
      id: 'pupil_r',
      path: 'M154,88 Q154,78 164,77 Q174,78 174,88 Q174,98 164,99 Q154,98 154,88 Z',
      defaultColor: '#2D3436',
      label: 'sağ göz bebeği',
    },
    {
      id: 'beak',
      path: 'M143,98 Q150,108 157,98 Z',
      defaultColor: '#FFC312',
      label: 'gaga',
    },
    {
      id: 'ear_tuft_l',
      path: 'M118,62 Q108,38 122,45 Q128,55 122,64 Z',
      defaultColor: '#8B6914',
      label: 'sol kulak tüyü',
    },
    {
      id: 'ear_tuft_r',
      path: 'M182,62 Q192,38 178,45 Q172,55 178,64 Z',
      defaultColor: '#8B6914',
      label: 'sağ kulak tüyü',
    },
  ],
};

export const squirrel = {
  id: 'squirrel',
  nameKey: 'animals.squirrel',
  emoji: '🐿️',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M90,152 Q92,108 148,103 Q205,108 208,152 Q205,200 148,205 Q92,200 90,152 Z',
      defaultColor: '#C49A6C',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M118,154 Q118,132 148,128 Q178,132 178,154 Q178,174 148,178 Q118,174 118,154 Z',
      defaultColor: '#F5DEB3',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M113,103 Q113,65 148,60 Q183,65 183,103 Q183,120 162,124 Q133,124 113,103 Z',
      defaultColor: '#C49A6C',
      label: 'baş',
    },
    {
      id: 'ear_l',
      path: 'M113,75 Q103,48 120,55 Q126,67 120,78 Z',
      defaultColor: '#C49A6C',
      label: 'sol kulak',
    },
    {
      id: 'ear_r',
      path: 'M183,75 Q193,48 176,55 Q170,67 176,78 Z',
      defaultColor: '#C49A6C',
      label: 'sağ kulak',
    },
    {
      id: 'tail',
      path: 'M205,148 Q240,125 252,158 Q248,195 215,190 Q205,175 205,148 Z',
      defaultColor: '#8B6914',
      label: 'kuyruk',
    },
    {
      id: 'snout',
      path: 'M133,98 Q133,112 148,115 Q163,112 163,98 Q163,88 148,86 Q133,88 133,98 Z',
      defaultColor: '#F5DEB3',
      label: 'burun',
    },
  ],
};

export const hedgehog = {
  id: 'hedgehog',
  nameKey: 'animals.hedgehog',
  emoji: '🦔',
  difficulty: 6,
  regions: [
    {
      id: 'body_spikes',
      path: 'M90,155 Q95,105 155,100 Q215,105 215,155 Q215,205 155,210 Q90,205 90,155 Z',
      defaultColor: '#8B6914',
      label: 'dikenli gövde',
    },
    {
      id: 'belly',
      path: 'M100,160 Q100,135 150,130 Q195,135 200,160 Q195,188 150,192 Q105,188 100,160 Z',
      defaultColor: '#F5DEB3',
      label: 'karın',
    },
    {
      id: 'face',
      path: 'M90,155 Q88,120 108,110 Q130,105 140,125 Q145,145 130,160 Q108,168 90,155 Z',
      defaultColor: '#C49A6C',
      label: 'yüz',
    },
    {
      id: 'snout',
      path: 'M88,155 Q78,150 76,158 Q78,166 90,162 Z',
      defaultColor: '#2D3436',
      label: 'burun',
    },
    {
      id: 'eye',
      path: 'M103,135 Q103,126 110,125 Q117,126 117,135 Q117,144 110,145 Q103,144 103,135 Z',
      defaultColor: '#2D3436',
      label: 'göz',
    },
    {
      id: 'spike1',
      path: 'M140,100 Q145,75 155,82 Q150,95 145,102 Z',
      defaultColor: '#2D3436',
      label: 'diken 1',
    },
    {
      id: 'spike2',
      path: 'M160,100 Q170,75 178,84 Q172,97 165,103 Z',
      defaultColor: '#2D3436',
      label: 'diken 2',
    },
    {
      id: 'spike3',
      path: 'M180,108 Q195,88 200,100 Q192,112 184,115 Z',
      defaultColor: '#2D3436',
      label: 'diken 3',
    },
  ],
};

export const deer = {
  id: 'deer',
  nameKey: 'animals.deer',
  emoji: '🦌',
  difficulty: 6,
  regions: [
    {
      id: 'body',
      path: 'M82,155 Q85,105 150,98 Q215,105 218,155 Q215,205 150,210 Q85,205 82,155 Z',
      defaultColor: '#C49A6C',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M112,158 Q112,135 150,130 Q188,135 188,158 Q188,180 150,184 Q112,180 112,158 Z',
      defaultColor: '#F5DEB3',
      label: 'karın',
    },
    {
      id: 'neck',
      path: 'M132,98 Q128,68 148,63 Q168,68 168,98 Z',
      defaultColor: '#C49A6C',
      label: 'boyun',
    },
    {
      id: 'head',
      path: 'M128,63 Q128,33 148,28 Q168,33 170,63 Q170,78 155,82 Q138,82 128,63 Z',
      defaultColor: '#C49A6C',
      label: 'baş',
    },
    {
      id: 'snout',
      path: 'M136,60 Q136,72 148,75 Q160,72 162,60 Q162,50 148,48 Q136,50 136,60 Z',
      defaultColor: '#F5DEB3',
      label: 'burun',
    },
    {
      id: 'antler_l',
      path: 'M128,35 Q115,15 108,25 Q115,32 120,38 Q112,28 105,38 Q112,42 120,40 Z',
      defaultColor: '#8B6914',
      label: 'sol boynuz',
    },
    {
      id: 'antler_r',
      path: 'M168,35 Q181,15 188,25 Q181,32 176,38 Q184,28 191,38 Q184,42 176,40 Z',
      defaultColor: '#8B6914',
      label: 'sağ boynuz',
    },
    {
      id: 'ear_l',
      path: 'M128,45 Q115,35 118,48 Q122,56 130,52 Z',
      defaultColor: '#F5DEB3',
      label: 'sol kulak',
    },
    {
      id: 'ear_r',
      path: 'M168,45 Q181,35 178,48 Q174,56 166,52 Z',
      defaultColor: '#F5DEB3',
      label: 'sağ kulak',
    },
  ],
};

export const FOREST_FRIENDS = [bear, fox, owl, squirrel, hedgehog, deer];
