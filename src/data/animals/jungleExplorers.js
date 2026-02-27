// GDD - Jungle Explorers Kategorisi (Orman Kaşifleri)

export const lion = {
  id: 'lion',
  nameKey: 'animals.lion',
  emoji: '🦁',
  difficulty: 6,
  regions: [
    {
      id: 'mane',
      path: 'M90,130 Q90,68 150,60 Q210,68 210,130 Q210,165 150,170 Q90,165 90,130 Z',
      defaultColor: '#E17055',
      label: 'yele',
    },
    {
      id: 'head',
      path: 'M112,120 Q112,80 150,75 Q188,80 188,120 Q188,140 165,145 Q135,145 112,120 Z',
      defaultColor: '#FDCB6E',
      label: 'baş',
    },
    {
      id: 'face',
      path: 'M125,118 Q125,95 150,91 Q175,95 175,118 Q175,135 155,138 Q145,138 125,118 Z',
      defaultColor: '#F5DEB3',
      label: 'yüz',
    },
    {
      id: 'body',
      path: 'M95,168 Q98,220 150,228 Q202,220 205,168 Z',
      defaultColor: '#FDCB6E',
      label: 'gövde',
    },
    {
      id: 'ear_l',
      path: 'M112,88 Q100,68 112,72 Q118,80 115,90 Z',
      defaultColor: '#FDCB6E',
      label: 'sol kulak',
    },
    {
      id: 'ear_r',
      path: 'M188,88 Q200,68 188,72 Q182,80 185,90 Z',
      defaultColor: '#FDCB6E',
      label: 'sağ kulak',
    },
    {
      id: 'snout',
      path: 'M132,115 Q132,128 150,132 Q168,128 168,115 Q168,105 150,103 Q132,105 132,115 Z',
      defaultColor: '#FFA07A',
      label: 'burun',
    },
    {
      id: 'nose',
      path: 'M144,110 Q144,116 150,117 Q156,116 156,110 Q156,105 150,104 Q144,105 144,110 Z',
      defaultColor: '#2D3436',
      label: 'burun ucu',
    },
    {
      id: 'tail',
      path: 'M202,195 Q232,182 238,200 Q232,218 208,214 Z',
      defaultColor: '#FDCB6E',
      label: 'kuyruk',
    },
    {
      id: 'tail_tuft',
      path: 'M232,192 Q248,185 252,200 Q248,215 235,212 Z',
      defaultColor: '#E17055',
      label: 'kuyruk tüyü',
    },
  ],
};

export const elephant = {
  id: 'elephant',
  nameKey: 'animals.elephant',
  emoji: '🐘',
  difficulty: 6,
  regions: [
    {
      id: 'body',
      path: 'M75,155 Q80,100 155,95 Q225,100 225,155 Q225,215 155,220 Q80,215 75,155 Z',
      defaultColor: '#B2BEC3',
      label: 'gövde',
    },
    {
      id: 'head',
      path: 'M108,95 Q108,52 155,47 Q198,52 198,95 Q198,118 172,122 Q135,122 108,95 Z',
      defaultColor: '#B2BEC3',
      label: 'baş',
    },
    {
      id: 'trunk',
      path: 'M130,118 Q118,145 115,175 Q118,188 128,185 Q138,182 140,168 Q140,142 148,120 Z',
      defaultColor: '#B2BEC3',
      label: 'hortum',
    },
    {
      id: 'ear_l',
      path: 'M108,80 Q72,65 68,105 Q70,135 105,125 Z',
      defaultColor: '#DFE6E9',
      label: 'sol kulak',
    },
    {
      id: 'ear_r',
      path: 'M198,80 Q222,72 222,105 Q218,128 198,120 Z',
      defaultColor: '#DFE6E9',
      label: 'sağ kulak',
    },
    {
      id: 'tusk_l',
      path: 'M132,118 Q115,135 108,152 Q110,158 120,155 Q130,140 142,122 Z',
      defaultColor: '#FFFFF0',
      label: 'sol diş',
    },
    {
      id: 'tusk_r',
      path: 'M148,118 Q162,135 168,152 Q165,158 156,155 Q148,140 142,122 Z',
      defaultColor: '#FFFFF0',
      label: 'sağ diş',
    },
    {
      id: 'tail',
      path: 'M222,158 Q248,148 252,165 Q248,182 225,178 Z',
      defaultColor: '#B2BEC3',
      label: 'kuyruk',
    },
  ],
};

export const giraffe = {
  id: 'giraffe',
  nameKey: 'animals.giraffe',
  emoji: '🦒',
  difficulty: 6,
  regions: [
    {
      id: 'body',
      path: 'M90,188 Q92,150 150,145 Q208,150 210,188 Q208,230 150,235 Q92,230 90,188 Z',
      defaultColor: '#FDCB6E',
      label: 'gövde',
    },
    {
      id: 'neck',
      path: 'M132,145 Q128,90 148,82 Q168,90 168,145 Z',
      defaultColor: '#FDCB6E',
      label: 'boyun',
    },
    {
      id: 'head',
      path: 'M128,82 Q128,52 148,47 Q168,52 170,82 Q170,96 155,100 Q138,100 128,82 Z',
      defaultColor: '#FDCB6E',
      label: 'baş',
    },
    {
      id: 'spot1',
      path: 'M108,175 Q108,162 118,160 Q128,162 128,175 Q128,188 118,190 Q108,188 108,175 Z',
      defaultColor: '#E17055',
      label: 'leke 1',
    },
    {
      id: 'spot2',
      path: 'M155,168 Q155,156 164,154 Q173,156 173,168 Q173,180 164,182 Q155,180 155,168 Z',
      defaultColor: '#E17055',
      label: 'leke 2',
    },
    {
      id: 'spot3',
      path: 'M138,105 Q138,97 144,96 Q150,97 150,105 Q150,113 144,114 Q138,113 138,105 Z',
      defaultColor: '#E17055',
      label: 'leke 3 (boyun)',
    },
    {
      id: 'horn_l',
      path: 'M133,48 Q130,28 136,30 Q140,36 138,50 Z',
      defaultColor: '#8B6914',
      label: 'sol boynuz',
    },
    {
      id: 'horn_r',
      path: 'M163,48 Q166,28 160,30 Q156,36 158,50 Z',
      defaultColor: '#8B6914',
      label: 'sağ boynuz',
    },
    {
      id: 'snout',
      path: 'M135,78 Q135,90 148,93 Q161,90 163,78 Q163,68 148,66 Q135,68 135,78 Z',
      defaultColor: '#F5DEB3',
      label: 'burun',
    },
  ],
};

export const monkey = {
  id: 'monkey',
  nameKey: 'animals.monkey',
  emoji: '🐒',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M88,152 Q92,108 150,103 Q208,108 212,152 Q208,205 150,210 Q92,205 88,152 Z',
      defaultColor: '#8B6914',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M118,155 Q118,132 150,128 Q182,132 182,155 Q182,175 150,178 Q118,175 118,155 Z',
      defaultColor: '#C49A6C',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M112,103 Q112,63 150,58 Q188,63 188,103 Q188,120 165,124 Q135,124 112,103 Z',
      defaultColor: '#8B6914',
      label: 'baş',
    },
    {
      id: 'face',
      path: 'M125,100 Q125,78 150,74 Q175,78 175,100 Q175,115 155,118 Q145,118 125,100 Z',
      defaultColor: '#C49A6C',
      label: 'yüz',
    },
    {
      id: 'ear_l',
      path: 'M112,85 Q96,78 96,95 Q102,108 116,103 Z',
      defaultColor: '#8B6914',
      label: 'sol kulak',
    },
    {
      id: 'ear_r',
      path: 'M188,85 Q204,78 204,95 Q198,108 184,103 Z',
      defaultColor: '#8B6914',
      label: 'sağ kulak',
    },
    {
      id: 'snout',
      path: 'M132,96 Q132,108 150,112 Q168,108 168,96 Q168,86 150,84 Q132,86 132,96 Z',
      defaultColor: '#F5DEB3',
      label: 'burun',
    },
    {
      id: 'tail',
      path: 'M210,152 Q242,135 248,162 Q242,190 215,185 Z',
      defaultColor: '#8B6914',
      label: 'kuyruk',
    },
  ],
};

export const zebra = {
  id: 'zebra',
  nameKey: 'animals.zebra',
  emoji: '🦓',
  difficulty: 7,
  regions: [
    {
      id: 'body',
      path: 'M80,152 Q85,105 150,98 Q215,105 220,152 Q215,205 150,210 Q85,205 80,152 Z',
      defaultColor: '#FFFFFF',
      label: 'gövde',
    },
    {
      id: 'stripe1',
      path: 'M110,100 Q115,135 108,165 Q100,165 100,135 Q102,105 110,100 Z',
      defaultColor: '#2D3436',
      label: 'çizgi 1',
    },
    {
      id: 'stripe2',
      path: 'M135,98 Q140,135 133,168 Q125,168 125,135 Q127,100 135,98 Z',
      defaultColor: '#2D3436',
      label: 'çizgi 2',
    },
    {
      id: 'stripe3',
      path: 'M160,98 Q165,135 158,168 Q150,168 150,135 Q152,100 160,98 Z',
      defaultColor: '#2D3436',
      label: 'çizgi 3',
    },
    {
      id: 'stripe4',
      path: 'M185,100 Q188,135 182,165 Q175,165 175,135 Q177,102 185,100 Z',
      defaultColor: '#2D3436',
      label: 'çizgi 4',
    },
    {
      id: 'neck',
      path: 'M130,98 Q125,65 148,60 Q170,65 170,98 Z',
      defaultColor: '#FFFFFF',
      label: 'boyun',
    },
    {
      id: 'head',
      path: 'M125,60 Q125,28 148,23 Q170,28 172,60 Q172,76 155,80 Q138,80 125,60 Z',
      defaultColor: '#FFFFFF',
      label: 'baş',
    },
    {
      id: 'mane',
      path: 'M130,30 Q120,18 132,22 Q138,30 135,42 Q132,35 130,30 Z',
      defaultColor: '#2D3436',
      label: 'yele',
    },
    {
      id: 'snout',
      path: 'M133,56 Q133,70 148,73 Q163,70 165,56 Q165,46 148,44 Q133,46 133,56 Z',
      defaultColor: '#F5DEB3',
      label: 'burun',
    },
  ],
};

export const tiger = {
  id: 'tiger',
  nameKey: 'animals.tiger',
  emoji: '🐯',
  difficulty: 7,
  regions: [
    {
      id: 'body',
      path: 'M82,152 Q88,105 150,98 Q212,105 218,152 Q212,208 150,213 Q88,208 82,152 Z',
      defaultColor: '#FDCB6E',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M115,155 Q115,130 150,125 Q185,130 185,155 Q185,178 150,182 Q115,178 115,155 Z',
      defaultColor: '#FFFFF0',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M112,98 Q112,60 150,55 Q188,60 188,98 Q188,116 165,120 Q135,120 112,98 Z',
      defaultColor: '#FDCB6E',
      label: 'baş',
    },
    {
      id: 'face_white',
      path: 'M128,95 Q128,112 150,116 Q172,112 172,95 Q172,82 150,80 Q128,82 128,95 Z',
      defaultColor: '#FFFFF0',
      label: 'yüz beyaz',
    },
    {
      id: 'stripe_head1',
      path: 'M138,60 Q140,75 136,80 Q130,78 132,62 Z',
      defaultColor: '#E17055',
      label: 'baş çizgisi 1',
    },
    {
      id: 'stripe_head2',
      path: 'M155,60 Q158,76 154,80 Q148,78 150,62 Z',
      defaultColor: '#E17055',
      label: 'baş çizgisi 2',
    },
    {
      id: 'stripe_body1',
      path: 'M108,112 Q104,140 106,165 Q100,165 100,140 Q102,114 108,112 Z',
      defaultColor: '#E17055',
      label: 'gövde çizgisi 1',
    },
    {
      id: 'stripe_body2',
      path: 'M192,112 Q196,140 194,165 Q200,165 200,140 Q198,114 192,112 Z',
      defaultColor: '#E17055',
      label: 'gövde çizgisi 2',
    },
    {
      id: 'ear_l',
      path: 'M112,72 Q102,50 114,56 Q120,65 118,76 Z',
      defaultColor: '#FDCB6E',
      label: 'sol kulak',
    },
    {
      id: 'ear_r',
      path: 'M188,72 Q198,50 186,56 Q180,65 182,76 Z',
      defaultColor: '#FDCB6E',
      label: 'sağ kulak',
    },
    {
      id: 'snout',
      path: 'M133,95 Q133,108 150,112 Q167,108 167,95 Q167,85 150,83 Q133,85 133,95 Z',
      defaultColor: '#FFA07A',
      label: 'burun',
    },
  ],
};

export const JUNGLE_EXPLORERS = [lion, elephant, giraffe, monkey, zebra, tiger];
