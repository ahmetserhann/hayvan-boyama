// GDD - Sea World Kategorisi (Deniz Dünyası)
// viewBox="0 0 300 300", Kawaii/chibi stil, stroke: #2D3436, fill: #FAFAFA

export const fish = {
  id: 'fish',
  nameKey: 'animals.fish',
  emoji: '🐠',
  difficulty: 3,   // kolay
  regions: [
    {
      id: 'body',
      path: 'M60,150 Q60,100 120,85 Q200,70 230,150 Q200,230 120,215 Q60,200 60,150 Z',
      defaultColor: '#FF9F43',
      label: 'gövde',
    },
    {
      id: 'tail',
      path: 'M230,150 L270,110 L280,150 L270,190 Z',
      defaultColor: '#E17055',
      label: 'kuyruk',
    },
    {
      id: 'fin_top',
      path: 'M120,85 Q150,55 175,75 Q160,90 130,90 Z',
      defaultColor: '#FDCB6E',
      label: 'üst yüzgeç',
    },
    {
      id: 'fin_bottom',
      path: 'M120,215 Q150,245 175,225 Q160,210 130,210 Z',
      defaultColor: '#FDCB6E',
      label: 'alt yüzgeç',
    },
    {
      id: 'eye',
      path: 'M100,135 Q100,120 115,120 Q130,120 130,135 Q130,150 115,150 Q100,150 100,135 Z',
      defaultColor: '#FFFFFF',
      label: 'göz',
    },
    {
      id: 'stripe',
      path: 'M155,80 Q165,150 155,220 Q145,220 145,150 Q145,80 155,80 Z',
      defaultColor: '#FFFFFF',
      label: 'çizgi',
    },
  ],
  outline: 'M60,150 Q60,100 120,85 Q200,70 230,150 Q200,230 120,215 Q60,200 60,150 Z M230,150 L270,110 L280,150 L270,190 Z',
};

export const turtle = {
  id: 'turtle',
  nameKey: 'animals.turtle',
  emoji: '🐢',
  difficulty: 4,
  regions: [
    {
      id: 'shell',
      path: 'M100,100 Q100,60 150,55 Q200,60 200,100 Q210,155 150,165 Q90,155 100,100 Z',
      defaultColor: '#27AE60',
      label: 'kabuk',
    },
    {
      id: 'shell_pattern',
      path: 'M120,80 L150,70 L180,80 L185,110 L150,125 L115,110 Z',
      defaultColor: '#1E8449',
      label: 'kabuk desen',
    },
    {
      id: 'head',
      path: 'M130,165 Q130,200 150,205 Q170,200 170,165 Z',
      defaultColor: '#52BE80',
      label: 'baş',
    },
    {
      id: 'leg_fl',
      path: 'M100,100 Q70,95 65,120 Q70,140 95,135 Z',
      defaultColor: '#52BE80',
      label: 'sol ön bacak',
    },
    {
      id: 'leg_fr',
      path: 'M200,100 Q230,95 235,120 Q230,140 205,135 Z',
      defaultColor: '#52BE80',
      label: 'sağ ön bacak',
    },
    {
      id: 'leg_bl',
      path: 'M100,150 Q70,155 68,175 Q74,190 98,182 Z',
      defaultColor: '#52BE80',
      label: 'sol arka bacak',
    },
    {
      id: 'leg_br',
      path: 'M200,150 Q230,155 232,175 Q226,190 202,182 Z',
      defaultColor: '#52BE80',
      label: 'sağ arka bacak',
    },
  ],
};

export const octopus = {
  id: 'octopus',
  nameKey: 'animals.octopus',
  emoji: '🐙',
  difficulty: 5,
  regions: [
    {
      id: 'head',
      path: 'M100,70 Q100,30 150,25 Q200,30 200,70 Q210,110 150,120 Q90,110 100,70 Z',
      defaultColor: '#E84393',
      label: 'baş',
    },
    {
      id: 'eye_l',
      path: 'M120,65 Q120,50 135,50 Q150,50 150,65 Q150,80 135,80 Q120,80 120,65 Z',
      defaultColor: '#FFFFFF',
      label: 'sol göz',
    },
    {
      id: 'eye_r',
      path: 'M150,65 Q150,50 165,50 Q180,50 180,65 Q180,80 165,80 Q150,80 150,65 Z',
      defaultColor: '#FFFFFF',
      label: 'sağ göz',
    },
    {
      id: 'tentacle1',
      path: 'M105,115 Q80,140 85,180 Q88,210 100,220 Q112,210 108,180 Q110,145 120,120 Z',
      defaultColor: '#FD79A8',
      label: 'dokunaç 1',
    },
    {
      id: 'tentacle2',
      path: 'M125,118 Q115,150 120,190 Q122,220 135,225 Q148,220 142,190 Q140,150 140,120 Z',
      defaultColor: '#FD79A8',
      label: 'dokunaç 2',
    },
    {
      id: 'tentacle3',
      path: 'M150,118 Q148,155 155,195 Q158,225 170,228 Q182,222 178,192 Q170,155 160,120 Z',
      defaultColor: '#FD79A8',
      label: 'dokunaç 3',
    },
    {
      id: 'tentacle4',
      path: 'M175,115 Q185,145 192,185 Q195,215 205,222 Q217,215 212,185 Q202,145 188,118 Z',
      defaultColor: '#FD79A8',
      label: 'dokunaç 4',
    },
  ],
};

export const crab = {
  id: 'crab',
  nameKey: 'animals.crab',
  emoji: '🦀',
  difficulty: 6,
  regions: [
    {
      id: 'body',
      path: 'M100,140 Q100,100 150,95 Q200,100 200,140 Q200,180 150,185 Q100,180 100,140 Z',
      defaultColor: '#E17055',
      label: 'gövde',
    },
    {
      id: 'claw_l',
      path: 'M100,125 Q65,110 55,130 Q48,155 65,165 Q80,170 95,155 Z',
      defaultColor: '#FF7675',
      label: 'sol kıskaç',
    },
    {
      id: 'claw_r',
      path: 'M200,125 Q235,110 245,130 Q252,155 235,165 Q220,170 205,155 Z',
      defaultColor: '#FF7675',
      label: 'sağ kıskaç',
    },
    {
      id: 'eye_l',
      path: 'M125,110 Q125,98 135,98 Q145,98 145,110 Q145,122 135,122 Q125,122 125,110 Z',
      defaultColor: '#FFFFFF',
      label: 'sol göz',
    },
    {
      id: 'eye_r',
      path: 'M155,110 Q155,98 165,98 Q175,98 175,110 Q175,122 165,122 Q155,122 155,110 Z',
      defaultColor: '#FFFFFF',
      label: 'sağ göz',
    },
    {
      id: 'legs',
      path: 'M105,155 L80,175 M120,160 L100,185 M180,160 L200,185 M195,155 L220,175',
      defaultColor: '#E17055',
      label: 'bacaklar',
    },
  ],
};

export const jellyfish = {
  id: 'jellyfish',
  nameKey: 'animals.jellyfish',
  emoji: '🪼',
  difficulty: 4,
  regions: [
    {
      id: 'cap',
      path: 'M80,120 Q80,60 150,50 Q220,60 220,120 Q220,150 150,155 Q80,150 80,120 Z',
      defaultColor: '#A29BFE',
      label: 'başlık',
    },
    {
      id: 'cap_inner',
      path: 'M100,118 Q100,80 150,75 Q200,80 200,118 Q200,135 150,138 Q100,135 100,118 Z',
      defaultColor: '#C8B8FF',
      label: 'iç başlık',
    },
    {
      id: 'tentacle1',
      path: 'M110,155 Q105,200 115,240 Q120,260 112,270 Q105,260 108,240 Q100,200 105,155 Z',
      defaultColor: '#D4C4FF',
      label: 'dokunaç 1',
    },
    {
      id: 'tentacle2',
      path: 'M135,157 Q130,205 138,245 Q142,265 135,273 Q128,264 132,244 Q125,204 130,157 Z',
      defaultColor: '#D4C4FF',
      label: 'dokunaç 2',
    },
    {
      id: 'tentacle3',
      path: 'M160,157 Q162,205 155,245 Q152,265 158,273 Q165,264 160,244 Q168,204 165,157 Z',
      defaultColor: '#D4C4FF',
      label: 'dokunaç 3',
    },
    {
      id: 'tentacle4',
      path: 'M185,155 Q188,200 178,240 Q174,260 180,270 Q188,260 185,240 Q193,200 190,155 Z',
      defaultColor: '#D4C4FF',
      label: 'dokunaç 4',
    },
  ],
};

export const seahorse = {
  id: 'seahorse',
  nameKey: 'animals.seahorse',
  emoji: '🦄',
  difficulty: 5,
  regions: [
    {
      id: 'head',
      path: 'M140,50 Q170,45 180,70 Q185,95 165,105 Q150,110 140,95 Q130,80 140,50 Z',
      defaultColor: '#FDCB6E',
      label: 'baş',
    },
    {
      id: 'body',
      path: 'M145,105 Q160,110 165,140 Q168,170 160,195 Q150,205 140,195 Q132,170 135,140 Q138,110 145,105 Z',
      defaultColor: '#FFC312',
      label: 'gövde',
    },
    {
      id: 'fin',
      path: 'M165,120 Q190,115 195,130 Q190,145 165,140 Z',
      defaultColor: '#E17055',
      label: 'yüzgeç',
    },
    {
      id: 'tail',
      path: 'M140,195 Q148,220 142,245 Q135,260 125,250 Q120,235 130,215 Q135,200 140,195 Z',
      defaultColor: '#FDCB6E',
      label: 'kuyruk',
    },
    {
      id: 'snout',
      path: 'M165,70 Q195,65 200,75 Q195,85 165,82 Z',
      defaultColor: '#E17055',
      label: 'burun',
    },
  ],
};

export const dolphin = {
  id: 'dolphin',
  nameKey: 'animals.dolphin',
  emoji: '🐬',
  difficulty: 5,
  regions: [
    {
      id: 'body',
      path: 'M60,150 Q70,100 130,90 Q200,85 240,150 Q200,215 130,210 Q70,200 60,150 Z',
      defaultColor: '#74B9FF',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M90,150 Q100,130 140,125 Q180,128 190,150 Q180,172 140,175 Q100,170 90,150 Z',
      defaultColor: '#FFFFFF',
      label: 'karın',
    },
    {
      id: 'fin_dorsal',
      path: 'M155,90 Q165,55 180,65 Q178,88 165,92 Z',
      defaultColor: '#0984E3',
      label: 'sırt yüzgeci',
    },
    {
      id: 'tail',
      path: 'M240,150 L270,120 L280,150 L270,180 Z',
      defaultColor: '#0984E3',
      label: 'kuyruk',
    },
    {
      id: 'snout',
      path: 'M60,150 Q40,140 30,150 Q40,160 60,150 Z',
      defaultColor: '#74B9FF',
      label: 'gaga',
    },
  ],
};

export const whale = {
  id: 'whale',
  nameKey: 'animals.whale',
  emoji: '🐳',
  difficulty: 4,
  regions: [
    {
      id: 'body',
      path: 'M50,150 Q60,85 150,70 Q240,75 260,150 Q240,225 150,230 Q60,215 50,150 Z',
      defaultColor: '#0984E3',
      label: 'gövde',
    },
    {
      id: 'belly',
      path: 'M80,155 Q90,125 150,118 Q210,125 220,155 Q210,185 150,192 Q90,185 80,155 Z',
      defaultColor: '#A8D8EA',
      label: 'karın',
    },
    {
      id: 'tail_l',
      path: 'M260,150 L290,120 L298,148 Z',
      defaultColor: '#0652DD',
      label: 'sol kuyruk',
    },
    {
      id: 'tail_r',
      path: 'M260,150 L290,180 L298,152 Z',
      defaultColor: '#0652DD',
      label: 'sağ kuyruk',
    },
    {
      id: 'water_spout',
      path: 'M145,70 Q148,30 150,20 Q152,30 155,70 Z',
      defaultColor: '#74B9FF',
      label: 'su fışkırtma',
    },
  ],
};

export const SEA_WORLD_ANIMALS = [fish, turtle, octopus, crab, jellyfish, seahorse, dolphin, whale];
