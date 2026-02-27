// GDD - Dino Adventure Kategorisi (Dino Serüveni)

export const trex = {
  id: 'trex',
  nameKey: 'animals.trex',
  emoji: '🦖',
  difficulty: 6,
  regions: [
    {
      id: 'body',
      path: 'M90,158 Q92,108 155,103 Q212,108 215,158 Q212,210 155,215 Q92,210 90,158 Z',
      defaultColor: '#27AE60',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M118,160 Q118,136 155,131 Q188,136 190,160 Q188,182 155,186 Q118,182 118,160 Z',
      defaultColor: '#A9DFBF',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M110,103 Q108,60 152,55 Q195,60 198,103 Q198,125 170,130 Q130,130 110,103 Z',
      defaultColor: '#27AE60',
      label: 'baş',
    },
    {
      id: 'upper_jaw',
      path: 'M110,103 Q108,88 152,84 Q195,88 198,103 Z',
      defaultColor: '#1E8449',
      label: 'üst çene',
    },
    {
      id: 'lower_jaw',
      path: 'M118,103 Q118,120 152,124 Q185,120 188,103 Z',
      defaultColor: '#1E8449',
      label: 'alt çene',
    },
    {
      id: 'teeth',
      path: 'M125,103 L130,115 L135,103 M145,103 L150,118 L155,103 M165,103 L170,114 L175,103',
      defaultColor: '#FFFFFF',
      label: 'dişler',
    },
    {
      id: 'arm_l',
      path: 'M110,135 Q92,135 88,148 Q90,160 105,158 Z',
      defaultColor: '#27AE60',
      label: 'sol kol',
    },
    {
      id: 'arm_r',
      path: 'M215,135 Q228,135 232,148 Q230,160 218,158 Z',
      defaultColor: '#27AE60',
      label: 'sağ kol',
    },
    {
      id: 'tail',
      path: 'M215,160 Q252,145 260,168 Q252,188 220,185 Z',
      defaultColor: '#27AE60',
      label: 'kuyruk',
    },
    {
      id: 'spikes',
      path: 'M148,55 Q152,32 158,40 Q155,52 152,58 Z M165,60 Q172,38 176,46 Q172,58 168,64 Z',
      defaultColor: '#1E8449',
      label: 'sırt dikenleri',
    },
  ],
};

export const stegosaurus = {
  id: 'stegosaurus',
  nameKey: 'animals.stegosaurus',
  emoji: '🦕',
  difficulty: 7,
  regions: [
    {
      id: 'body',
      path: 'M78,165 Q85,115 150,108 Q215,115 222,165 Q215,218 150,222 Q85,218 78,165 Z',
      defaultColor: '#27AE60',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M105,168 Q105,142 150,137 Q195,142 195,168 Q195,192 150,196 Q105,192 105,168 Z',
      defaultColor: '#A9DFBF',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M78,145 Q72,108 95,100 Q115,97 122,118 Q122,140 105,148 Z',
      defaultColor: '#27AE60',
      label: 'baş',
    },
    {
      id: 'plate1',
      path: 'M118,108 Q122,78 132,85 Q130,100 125,110 Z',
      defaultColor: '#E17055',
      label: 'plaka 1',
    },
    {
      id: 'plate2',
      path: 'M135,106 Q140,72 150,80 Q148,96 143,108 Z',
      defaultColor: '#FDCB6E',
      label: 'plaka 2',
    },
    {
      id: 'plate3',
      path: 'M152,106 Q158,72 168,80 Q165,96 160,108 Z',
      defaultColor: '#E17055',
      label: 'plaka 3',
    },
    {
      id: 'plate4',
      path: 'M168,108 Q175,78 185,86 Q182,100 177,110 Z',
      defaultColor: '#FDCB6E',
      label: 'plaka 4',
    },
    {
      id: 'tail_spikes',
      path: 'M220,165 Q248,150 255,168 Q248,185 222,182 Z',
      defaultColor: '#FDCB6E',
      label: 'kuyruk dikeni',
    },
    {
      id: 'snout',
      path: 'M72,135 Q58,132 54,144 Q58,156 72,153 Z',
      defaultColor: '#A9DFBF',
      label: 'burun',
    },
  ],
};

export const triceratops = {
  id: 'triceratops',
  nameKey: 'animals.triceratops',
  emoji: '🦕',
  difficulty: 6,
  regions: [
    {
      id: 'body',
      path: 'M85,162 Q90,115 152,108 Q215,115 218,162 Q215,215 152,220 Q90,215 85,162 Z',
      defaultColor: '#6C5CE7',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M115,165 Q115,140 152,135 Q188,140 188,165 Q188,188 152,192 Q115,188 115,165 Z',
      defaultColor: '#A29BFE',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M85,145 Q78,105 112,95 Q140,90 148,115 Q148,140 128,152 Z',
      defaultColor: '#6C5CE7',
      label: 'baş',
    },
    {
      id: 'frill',
      path: 'M88,108 Q72,80 90,78 Q108,82 118,100 Q110,105 95,108 Z',
      defaultColor: '#A29BFE',
      label: 'boyun kalkanı',
    },
    {
      id: 'horn_nose',
      path: 'M95,108 Q85,88 92,85 Q100,88 102,108 Z',
      defaultColor: '#DFE6E9',
      label: 'burun boynuzu',
    },
    {
      id: 'horn_l',
      path: 'M93,100 Q80,78 88,76 Q96,80 98,100 Z',
      defaultColor: '#DFE6E9',
      label: 'sol boynuz',
    },
    {
      id: 'horn_r',
      path: 'M115,95 Q108,73 116,72 Q124,76 122,96 Z',
      defaultColor: '#DFE6E9',
      label: 'sağ boynuz',
    },
    {
      id: 'eye',
      path: 'M120,118 Q120,108 128,107 Q136,108 136,118 Q136,128 128,129 Q120,128 120,118 Z',
      defaultColor: '#FFFFFF',
      label: 'göz',
    },
    {
      id: 'tail',
      path: 'M215,162 Q246,148 252,165 Q246,182 218,178 Z',
      defaultColor: '#6C5CE7',
      label: 'kuyruk',
    },
  ],
};

export const pterodactyl = {
  id: 'pterodactyl',
  nameKey: 'animals.pterodactyl',
  emoji: '🦅',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M120,155 Q125,120 152,115 Q178,120 180,155 Q178,185 152,188 Q125,185 120,155 Z',
      defaultColor: '#8B5E3C',
      label: 'gövde',
    },
    {
      id: 'wing_l',
      path: 'M125,140 Q95,115 62,130 Q50,145 65,158 Q90,160 120,152 Z',
      defaultColor: '#A0522D',
      label: 'sol kanat',
    },
    {
      id: 'wing_r',
      path: 'M178,140 Q208,115 240,130 Q252,145 238,158 Q212,160 182,152 Z',
      defaultColor: '#A0522D',
      label: 'sağ kanat',
    },
    {
      id: 'head',
      path: 'M134,115 Q132,80 152,75 Q172,80 170,115 Q170,128 155,132 Q138,132 134,115 Z',
      defaultColor: '#8B5E3C',
      label: 'baş',
    },
    {
      id: 'crest',
      path: 'M140,78 Q138,50 152,44 Q165,50 162,78 Z',
      defaultColor: '#E17055',
      label: 'tepeli',
    },
    {
      id: 'beak',
      path: 'M132,112 Q118,108 110,118 Q118,128 132,124 Z',
      defaultColor: '#FDCB6E',
      label: 'gaga',
    },
    {
      id: 'tail',
      path: 'M178,168 Q210,162 215,175 Q210,188 180,184 Z',
      defaultColor: '#8B5E3C',
      label: 'kuyruk',
    },
  ],
};

export const brontosaurus = {
  id: 'brontosaurus',
  nameKey: 'animals.brontosaurus',
  emoji: '🦕',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M80,168 Q85,122 150,116 Q215,122 220,168 Q215,222 150,226 Q85,222 80,168 Z',
      defaultColor: '#2ECC71',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M110,170 Q110,146 150,142 Q190,146 190,170 Q190,194 150,198 Q110,194 110,170 Z',
      defaultColor: '#A9DFBF',
      label: 'karın',
    },
    {
      id: 'neck',
      path: 'M132,116 Q128,72 148,65 Q168,72 168,116 Z',
      defaultColor: '#2ECC71',
      label: 'boyun',
    },
    {
      id: 'head',
      path: 'M132,65 Q132,38 148,33 Q165,38 165,65 Q165,78 152,82 Q138,82 132,65 Z',
      defaultColor: '#2ECC71',
      label: 'baş',
    },
    {
      id: 'snout',
      path: 'M135,60 Q135,72 148,75 Q162,72 162,60 Q162,50 148,48 Q135,50 135,60 Z',
      defaultColor: '#A9DFBF',
      label: 'burun',
    },
    {
      id: 'tail',
      path: 'M218,168 Q256,152 262,175 Q256,198 222,194 Z',
      defaultColor: '#2ECC71',
      label: 'kuyruk',
    },
  ],
};

export const DINO_ADVENTURE = [trex, stegosaurus, triceratops, pterodactyl, brontosaurus];
