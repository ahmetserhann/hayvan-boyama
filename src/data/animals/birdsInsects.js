// GDD - Birds & Insects Kategorisi (Kuşlar ve Böcekler)

export const butterfly = {
  id: 'butterfly',
  nameKey: 'animals.butterfly',
  emoji: '🦋',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M145,80 Q145,220 150,235 Q155,220 155,80 Z',
      defaultColor: '#2D3436',
      label: 'gövde',
    },
    {
      id: 'wing_tl',
      path: 'M148,120 Q130,90 78,78 Q48,82 48,112 Q55,148 105,148 Q130,145 148,130 Z',
      defaultColor: '#FF6B9D',
      label: 'sol üst kanat',
    },
    {
      id: 'wing_bl',
      path: 'M148,148 Q128,155 85,175 Q55,188 58,210 Q72,228 110,218 Q138,205 148,178 Z',
      defaultColor: '#FF9F43',
      label: 'sol alt kanat',
    },
    {
      id: 'wing_tr',
      path: 'M152,120 Q170,90 222,78 Q252,82 252,112 Q245,148 195,148 Q170,145 152,130 Z',
      defaultColor: '#FF6B9D',
      label: 'sağ üst kanat',
    },
    {
      id: 'wing_br',
      path: 'M152,148 Q172,155 215,175 Q245,188 242,210 Q228,228 190,218 Q162,205 152,178 Z',
      defaultColor: '#FF9F43',
      label: 'sağ alt kanat',
    },
    {
      id: 'pattern_l',
      path: 'M115,108 Q108,95 98,100 Q92,112 100,122 Q110,128 120,120 Z',
      defaultColor: '#FFC312',
      label: 'sol desen',
    },
    {
      id: 'pattern_r',
      path: 'M185,108 Q192,95 202,100 Q208,112 200,122 Q190,128 180,120 Z',
      defaultColor: '#FFC312',
      label: 'sağ desen',
    },
    {
      id: 'antenna_l',
      path: 'M146,80 Q135,60 128,48 Q132,46 138,52 Q142,62 148,80 Z',
      defaultColor: '#2D3436',
      label: 'sol anten',
    },
    {
      id: 'antenna_r',
      path: 'M154,80 Q165,60 172,48 Q168,46 162,52 Q158,62 152,80 Z',
      defaultColor: '#2D3436',
      label: 'sağ anten',
    },
  ],
};

export const bee = {
  id: 'bee',
  nameKey: 'animals.bee',
  emoji: '🐝',
  difficulty: 5,
  regions: [
    {
      id: 'abdomen',
      path: 'M115,155 Q112,125 150,118 Q188,125 185,155 Q188,195 150,200 Q112,195 115,155 Z',
      defaultColor: '#FFC312',
      label: 'karın',
    },
    {
      id: 'stripe1',
      path: 'M115,145 Q114,138 150,134 Q186,138 185,145 Q186,152 150,156 Q114,152 115,145 Z',
      defaultColor: '#2D3436',
      label: 'çizgi 1',
    },
    {
      id: 'stripe2',
      path: 'M118,168 Q118,162 150,158 Q182,162 182,168 Q182,174 150,178 Q118,174 118,168 Z',
      defaultColor: '#2D3436',
      label: 'çizgi 2',
    },
    {
      id: 'thorax',
      path: 'M122,118 Q122,98 150,93 Q178,98 178,118 Q178,130 155,132 Q145,132 122,118 Z',
      defaultColor: '#E17055',
      label: 'göğüs',
    },
    {
      id: 'head',
      path: 'M128,93 Q128,68 150,63 Q172,68 172,93 Q172,106 155,110 Q145,110 128,93 Z',
      defaultColor: '#2D3436',
      label: 'baş',
    },
    {
      id: 'wing_l',
      path: 'M122,108 Q95,92 72,100 Q62,115 78,125 Q100,130 122,120 Z',
      defaultColor: 'rgba(180,220,255,0.7)',
      label: 'sol kanat',
    },
    {
      id: 'wing_r',
      path: 'M178,108 Q205,92 228,100 Q238,115 222,125 Q200,130 178,120 Z',
      defaultColor: 'rgba(180,220,255,0.7)',
      label: 'sağ kanat',
    },
    {
      id: 'antenna_l',
      path: 'M140,64 Q132,44 126,36 Q130,33 136,40 Q140,50 142,65 Z',
      defaultColor: '#2D3436',
      label: 'sol anten',
    },
    {
      id: 'antenna_r',
      path: 'M160,64 Q168,44 174,36 Q170,33 164,40 Q160,50 158,65 Z',
      defaultColor: '#2D3436',
      label: 'sağ anten',
    },
    {
      id: 'stinger',
      path: 'M146,200 Q150,218 154,200 Z',
      defaultColor: '#2D3436',
      label: 'iğne',
    },
  ],
};

export const ladybug = {
  id: 'ladybug',
  nameKey: 'animals.ladybug',
  emoji: '🐞',
  difficulty: 4,
  regions: [
    {
      id: 'wing_l',
      path: 'M90,155 Q88,110 130,100 Q155,100 155,155 Q155,200 130,208 Q88,200 90,155 Z',
      defaultColor: '#FF4757',
      label: 'sol kanat',
    },
    {
      id: 'wing_r',
      path: 'M150,155 Q150,100 170,100 Q212,110 210,155 Q208,200 170,208 Q150,200 150,155 Z',
      defaultColor: '#FF4757',
      label: 'sağ kanat',
    },
    {
      id: 'spot_l1',
      path: 'M102,132 Q102,118 116,116 Q130,118 130,132 Q130,146 116,148 Q102,146 102,132 Z',
      defaultColor: '#2D3436',
      label: 'sol leke 1',
    },
    {
      id: 'spot_l2',
      path: 'M100,175 Q100,163 112,161 Q124,163 124,175 Q124,187 112,189 Q100,187 100,175 Z',
      defaultColor: '#2D3436',
      label: 'sol leke 2',
    },
    {
      id: 'spot_r1',
      path: 'M170,132 Q170,118 184,116 Q198,118 198,132 Q198,146 184,148 Q170,146 170,132 Z',
      defaultColor: '#2D3436',
      label: 'sağ leke 1',
    },
    {
      id: 'spot_r2',
      path: 'M176,175 Q176,163 188,161 Q200,163 200,175 Q200,187 188,189 Q176,187 176,175 Z',
      defaultColor: '#2D3436',
      label: 'sağ leke 2',
    },
    {
      id: 'center_line',
      path: 'M150,100 L150,208',
      defaultColor: '#2D3436',
      label: 'orta çizgi',
    },
    {
      id: 'head',
      path: 'M118,100 Q118,72 150,67 Q182,72 182,100 Q182,115 162,118 Q138,118 118,100 Z',
      defaultColor: '#2D3436',
      label: 'baş',
    },
    {
      id: 'eye_l',
      path: 'M126,90 Q126,80 135,79 Q144,80 144,90 Q144,100 135,101 Q126,100 126,90 Z',
      defaultColor: '#FFFFFF',
      label: 'sol göz',
    },
    {
      id: 'eye_r',
      path: 'M156,90 Q156,80 165,79 Q174,80 174,90 Q174,100 165,101 Q156,100 156,90 Z',
      defaultColor: '#FFFFFF',
      label: 'sağ göz',
    },
  ],
};

export const flamingo = {
  id: 'flamingo',
  nameKey: 'animals.flamingo',
  emoji: '🦩',
  difficulty: 6,
  regions: [
    {
      id: 'body',
      path: 'M120,148 Q118,112 150,106 Q182,112 182,148 Q182,188 155,195 Q122,188 120,148 Z',
      defaultColor: '#FF6B9D',
      label: 'gövde',
    },
    {
      id: 'neck',
      path: 'M140,106 Q135,70 148,60 Q162,68 160,106 Z',
      defaultColor: '#FF6B9D',
      label: 'boyun',
    },
    {
      id: 'head',
      path: 'M136,60 Q134,38 148,33 Q162,38 162,60 Q162,72 152,76 Q140,72 136,60 Z',
      defaultColor: '#FF6B9D',
      label: 'baş',
    },
    {
      id: 'beak_top',
      path: 'M136,58 Q120,52 112,60 Q116,70 136,68 Z',
      defaultColor: '#FF4757',
      label: 'gaga üst',
    },
    {
      id: 'beak_bottom',
      path: 'M138,68 Q122,70 118,78 Q126,84 140,78 Z',
      defaultColor: '#2D3436',
      label: 'gaga alt',
    },
    {
      id: 'wing',
      path: 'M120,148 Q95,138 80,155 Q82,175 105,170 Q118,162 122,155 Z',
      defaultColor: '#FF9F43',
      label: 'kanat',
    },
    {
      id: 'leg_l',
      path: 'M138,195 Q132,230 128,252 Q132,258 140,252 Q144,230 142,195 Z',
      defaultColor: '#FF6B9D',
      label: 'sol bacak',
    },
    {
      id: 'leg_r',
      path: 'M158,195 Q164,230 168,252 Q162,258 154,252 Q150,230 152,195 Z',
      defaultColor: '#FF6B9D',
      label: 'sağ bacak',
    },
    {
      id: 'foot_l',
      path: 'M128,252 Q112,258 110,265 Q120,268 132,262 Q140,256 140,252 Z',
      defaultColor: '#FF6B9D',
      label: 'sol ayak',
    },
    {
      id: 'foot_r',
      path: 'M168,252 Q184,258 186,265 Q176,268 164,262 Q156,256 154,252 Z',
      defaultColor: '#FF6B9D',
      label: 'sağ ayak',
    },
  ],
};

export const parrot = {
  id: 'parrot',
  nameKey: 'animals.parrot',
  emoji: '🦜',
  difficulty: 6,
  regions: [
    {
      id: 'body',
      path: 'M108,152 Q112,108 150,102 Q188,108 192,152 Q188,205 150,210 Q112,205 108,152 Z',
      defaultColor: '#2ED573',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M128,155 Q128,132 150,128 Q172,132 172,155 Q172,178 150,182 Q128,178 128,155 Z',
      defaultColor: '#FFC312',
      label: 'karın',
    },
    {
      id: 'head',
      path: 'M118,102 Q118,62 150,57 Q182,62 182,102 Q182,120 162,124 Q138,124 118,102 Z',
      defaultColor: '#2ED573',
      label: 'baş',
    },
    {
      id: 'cheek',
      path: 'M128,100 Q128,115 148,118 Q168,115 170,100 Z',
      defaultColor: '#FF4757',
      label: 'yanak',
    },
    {
      id: 'beak',
      path: 'M138,100 Q128,110 130,122 Q140,128 148,120 Q152,108 145,100 Z',
      defaultColor: '#FFC312',
      label: 'gaga',
    },
    {
      id: 'wing_l',
      path: 'M112,148 Q85,135 72,152 Q75,170 102,165 Z',
      defaultColor: '#45AAF2',
      label: 'kanat',
    },
    {
      id: 'tail',
      path: 'M188,165 Q220,155 225,175 Q220,195 190,190 Z',
      defaultColor: '#45AAF2',
      label: 'kuyruk',
    },
    {
      id: 'crest',
      path: 'M142,58 Q138,32 150,26 Q162,32 158,58 Z',
      defaultColor: '#FFC312',
      label: 'ibik',
    },
    {
      id: 'eye',
      path: 'M158,90 Q158,80 166,79 Q174,80 174,90 Q174,100 166,101 Q158,100 158,90 Z',
      defaultColor: '#2D3436',
      label: 'göz',
    },
  ],
};

export const BIRDS_INSECTS = [butterfly, bee, ladybug, flamingo, parrot];
