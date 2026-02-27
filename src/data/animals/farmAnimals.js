// GDD - Farm Animals Kategorisi (Çiftlik Hayvanları)
// viewBox="0 0 300 300", Kawaii/chibi stil

export const cow = {
  id: 'cow',
  nameKey: 'animals.cow',
  emoji: '🐄',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M80,130 Q80,85 150,80 Q220,85 220,130 Q220,195 150,200 Q80,195 80,130 Z',
      defaultColor: '#FFFFFF',
      label: 'gövde',
    },
    {
      id: 'spot1',
      path: 'M100,110 Q100,90 120,88 Q140,90 140,110 Q140,128 120,130 Q100,128 100,110 Z',
      defaultColor: '#2D3436',
      label: 'leke 1',
    },
    {
      id: 'spot2',
      path: 'M165,140 Q165,125 178,123 Q192,125 192,140 Q192,155 178,157 Q165,155 165,140 Z',
      defaultColor: '#2D3436',
      label: 'leke 2',
    },
    {
      id: 'head',
      path: 'M115,80 Q115,45 150,40 Q185,45 185,80 Q185,100 160,105 Q140,105 115,80 Z',
      defaultColor: '#FFFFFF',
      label: 'baş',
    },
    {
      id: 'snout',
      path: 'M130,85 Q130,100 150,103 Q170,100 170,85 Q170,75 150,73 Q130,75 130,85 Z',
      defaultColor: '#FFDDD9',
      label: 'burun',
    },
    {
      id: 'ear_l',
      path: 'M115,60 Q100,50 98,70 Q104,80 118,75 Z',
      defaultColor: '#FFDDD9',
      label: 'sol kulak',
    },
    {
      id: 'ear_r',
      path: 'M185,60 Q200,50 202,70 Q196,80 182,75 Z',
      defaultColor: '#FFDDD9',
      label: 'sağ kulak',
    },
    {
      id: 'udder',
      path: 'M120,195 Q120,215 150,220 Q180,215 180,195 Z',
      defaultColor: '#FFDDD9',
      label: 'meme',
    },
  ],
};

export const pig = {
  id: 'pig',
  nameKey: 'animals.pig',
  emoji: '🐷',
  difficulty: 4,
  regions: [
    {
      id: 'body',
      path: 'M80,140 Q80,95 150,90 Q220,95 220,140 Q220,195 150,200 Q80,195 80,140 Z',
      defaultColor: '#FFACB7',
      label: 'gövde',
    },
    {
      id: 'head',
      path: 'M110,90 Q110,50 150,45 Q190,50 190,90 Q190,110 165,115 Q135,115 110,90 Z',
      defaultColor: '#FFB3C1',
      label: 'baş',
    },
    {
      id: 'snout',
      path: 'M128,88 Q128,105 150,108 Q172,105 172,88 Q172,76 150,74 Q128,76 128,88 Z',
      defaultColor: '#FF6B9D',
      label: 'burun',
    },
    {
      id: 'ear_l',
      path: 'M110,65 Q92,42 100,72 Q108,82 120,78 Z',
      defaultColor: '#FF6B9D',
      label: 'sol kulak',
    },
    {
      id: 'ear_r',
      path: 'M190,65 Q208,42 200,72 Q192,82 180,78 Z',
      defaultColor: '#FF6B9D',
      label: 'sağ kulak',
    },
    {
      id: 'tail',
      path: 'M218,140 Q235,130 240,145 Q238,160 225,158 Q218,155 218,140 Z',
      defaultColor: '#FF6B9D',
      label: 'kuyruk',
    },
  ],
};

export const chicken = {
  id: 'chicken',
  nameKey: 'animals.chicken',
  emoji: '🐔',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M90,145 Q90,100 150,95 Q205,100 210,145 Q205,200 150,205 Q90,200 90,145 Z',
      defaultColor: '#FFFFFF',
      label: 'gövde',
    },
    {
      id: 'head',
      path: 'M120,95 Q120,60 150,55 Q178,60 178,95 Q178,112 160,115 Q138,115 120,95 Z',
      defaultColor: '#FFFFFF',
      label: 'baş',
    },
    {
      id: 'crest',
      path: 'M140,55 Q135,30 148,35 Q145,20 155,28 Q160,15 162,35 Q172,30 168,55 Z',
      defaultColor: '#FF4757',
      label: 'ibik',
    },
    {
      id: 'beak',
      path: 'M148,88 Q148,103 162,105 Q172,100 168,88 Z',
      defaultColor: '#FFC312',
      label: 'gaga',
    },
    {
      id: 'wattle',
      path: 'M148,103 Q142,115 148,122 Q155,115 148,103 Z',
      defaultColor: '#FF4757',
      label: 'sakal',
    },
    {
      id: 'wing',
      path: 'M95,145 Q75,135 68,155 Q72,175 92,170 Z',
      defaultColor: '#F0F0F0',
      label: 'kanat',
    },
    {
      id: 'tail',
      path: 'M208,135 Q228,120 232,140 Q228,158 210,155 Z',
      defaultColor: '#F0F0F0',
      label: 'kuyruk',
    },
  ],
};

export const horse = {
  id: 'horse',
  nameKey: 'animals.horse',
  emoji: '🐴',
  difficulty: 6,
  regions: [
    {
      id: 'body',
      path: 'M75,145 Q80,95 150,88 Q220,95 225,145 Q220,200 150,205 Q80,200 75,145 Z',
      defaultColor: '#C0A882',
      label: 'gövde',
    },
    {
      id: 'neck',
      path: 'M135,88 Q130,55 148,50 Q165,55 168,88 Z',
      defaultColor: '#C0A882',
      label: 'boyun',
    },
    {
      id: 'head',
      path: 'M135,50 Q130,20 148,15 Q165,20 170,50 Q170,65 155,68 Q138,65 135,50 Z',
      defaultColor: '#C0A882',
      label: 'baş',
    },
    {
      id: 'mane',
      path: 'M135,30 Q120,25 118,50 Q125,55 140,48 Q138,35 135,30 Z',
      defaultColor: '#8B6914',
      label: 'yele',
    },
    {
      id: 'snout',
      path: 'M140,50 Q138,65 150,68 Q162,65 162,50 Q162,40 150,38 Q138,40 140,50 Z',
      defaultColor: '#E8C99A',
      label: 'burun',
    },
    {
      id: 'ear_l',
      path: 'M135,18 Q128,5 135,8 Q140,12 140,20 Z',
      defaultColor: '#E8C99A',
      label: 'sol kulak',
    },
    {
      id: 'ear_r',
      path: 'M162,18 Q168,5 162,8 Q157,12 158,20 Z',
      defaultColor: '#E8C99A',
      label: 'sağ kulak',
    },
    {
      id: 'tail',
      path: 'M222,145 Q248,130 252,155 Q248,175 225,170 Z',
      defaultColor: '#8B6914',
      label: 'kuyruk',
    },
  ],
};

export const sheep = {
  id: 'sheep',
  nameKey: 'animals.sheep',
  emoji: '🐑',
  difficulty: 4,
  regions: [
    {
      id: 'wool',
      path: 'M70,145 Q70,85 150,78 Q230,85 230,145 Q230,195 150,200 Q70,195 70,145 Z',
      defaultColor: '#F5F5F5',
      label: 'yün',
    },
    {
      id: 'face',
      path: 'M118,100 Q118,72 150,68 Q182,72 182,100 Q182,118 165,122 Q135,122 118,100 Z',
      defaultColor: '#D4C5B0',
      label: 'yüz',
    },
    {
      id: 'ear_l',
      path: 'M118,85 Q100,75 98,92 Q104,103 118,98 Z',
      defaultColor: '#FFB3C1',
      label: 'sol kulak',
    },
    {
      id: 'ear_r',
      path: 'M182,85 Q200,75 202,92 Q196,103 182,98 Z',
      defaultColor: '#FFB3C1',
      label: 'sağ kulak',
    },
    {
      id: 'snout',
      path: 'M135,100 Q135,112 150,115 Q165,112 165,100 Q165,90 150,88 Q135,90 135,100 Z',
      defaultColor: '#C4A882',
      label: 'burun',
    },
  ],
};

export const duck = {
  id: 'duck',
  nameKey: 'animals.duck',
  emoji: '🦆',
  difficulty: 4,
  regions: [
    {
      id: 'body',
      path: 'M80,155 Q85,110 150,105 Q215,110 218,155 Q215,205 150,210 Q85,205 80,155 Z',
      defaultColor: '#FFFFFF',
      label: 'gövde',
    },
    {
      id: 'head',
      path: 'M118,105 Q118,68 148,63 Q178,68 180,105 Q178,122 160,125 Q136,125 118,105 Z',
      defaultColor: '#2ED573',
      label: 'baş',
    },
    {
      id: 'beak',
      path: 'M118,98 Q100,95 95,105 Q100,115 118,112 Z',
      defaultColor: '#FFC312',
      label: 'gaga',
    },
    {
      id: 'wing',
      path: 'M84,152 Q62,145 58,162 Q64,178 85,173 Z',
      defaultColor: '#F0F0F0',
      label: 'kanat',
    },
    {
      id: 'tail',
      path: 'M216,148 Q238,138 242,155 Q238,172 218,168 Z',
      defaultColor: '#F0F0F0',
      label: 'kuyruk',
    },
  ],
};

export const rabbit = {
  id: 'rabbit',
  nameKey: 'animals.rabbit',
  emoji: '🐰',
  difficulty: 4,
  regions: [
    {
      id: 'body',
      path: 'M90,155 Q90,110 150,105 Q210,110 210,155 Q210,205 150,210 Q90,205 90,155 Z',
      defaultColor: '#F5F5F5',
      label: 'gövde',
    },
    {
      id: 'head',
      path: 'M115,105 Q115,68 150,63 Q185,68 185,105 Q185,122 162,126 Q138,126 115,105 Z',
      defaultColor: '#F5F5F5',
      label: 'baş',
    },
    {
      id: 'ear_l',
      path: 'M120,68 Q112,20 128,15 Q140,20 135,68 Z',
      defaultColor: '#F5F5F5',
      label: 'sol kulak',
    },
    {
      id: 'ear_l_inner',
      path: 'M122,64 Q116,25 128,22 Q136,26 132,64 Z',
      defaultColor: '#FFB3C1',
      label: 'sol kulak iç',
    },
    {
      id: 'ear_r',
      path: 'M180,68 Q188,20 172,15 Q160,20 165,68 Z',
      defaultColor: '#F5F5F5',
      label: 'sağ kulak',
    },
    {
      id: 'ear_r_inner',
      path: 'M178,64 Q184,25 172,22 Q164,26 168,64 Z',
      defaultColor: '#FFB3C1',
      label: 'sağ kulak iç',
    },
    {
      id: 'snout',
      path: 'M133,100 Q133,112 150,115 Q167,112 167,100 Q167,90 150,88 Q133,90 133,100 Z',
      defaultColor: '#FFB3C1',
      label: 'burun',
    },
    {
      id: 'tail',
      path: 'M210,160 Q228,155 230,168 Q228,180 212,177 Z',
      defaultColor: '#FFFFFF',
      label: 'kuyruk',
    },
  ],
};

export const FARM_ANIMALS = [cow, pig, chicken, horse, sheep, duck, rabbit];
