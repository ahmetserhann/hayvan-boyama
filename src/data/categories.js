import { HAYVANLAR } from './animals/hayvanlar';
import { ARACLAR } from './animals/araclar';
import { YIYECEKLER } from './animals/yiyecekler';
import { DOGA } from './animals/doga';
import { DENIZ } from './animals/deniz';
import { UZAY } from './animals/uzay';
import { PRENSES } from './animals/prenses';
import { DINOZORLAR } from './animals/dinozorlar';

export const CATEGORIES = [
  {
    id: 'hayvanlar',
    nameKey: 'categoryNames.hayvanlar',
    emoji: '🐾',
    gradientIndex: 0,
    items: HAYVANLAR,
  },
  {
    id: 'araclar',
    nameKey: 'categoryNames.araclar',
    emoji: '🚗',
    gradientIndex: 1,
    items: ARACLAR,
  },
  {
    id: 'yiyecekler',
    nameKey: 'categoryNames.yiyecekler',
    emoji: '🍎',
    gradientIndex: 2,
    items: YIYECEKLER,
  },
  {
    id: 'doga',
    nameKey: 'categoryNames.doga',
    emoji: '🌳',
    gradientIndex: 3,
    items: DOGA,
  },
  {
    id: 'deniz',
    nameKey: 'categoryNames.deniz',
    emoji: '🐟',
    gradientIndex: 4,
    items: DENIZ,
  },
  {
    id: 'uzay',
    nameKey: 'categoryNames.uzay',
    emoji: '🚀',
    gradientIndex: 5,
    items: UZAY,
  },
  {
    id: 'prenses',
    nameKey: 'categoryNames.prenses',
    emoji: '👸',
    gradientIndex: 6,
    items: PRENSES,
  },
  {
    id: 'dinozorlar',
    nameKey: 'categoryNames.dinozorlar',
    emoji: '🦖',
    gradientIndex: 7,
    items: DINOZORLAR,
  },
];
