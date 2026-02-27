// GDD v2.0 - 6 Hayvan Kategorisi
// Her kategorinin görsel teması, rengi ve hayvan listesi
import { SEA_WORLD_ANIMALS } from './animals/seaWorld';
import { FARM_ANIMALS } from './animals/farmAnimals';
import { FOREST_FRIENDS } from './animals/forestFriends';
import { JUNGLE_EXPLORERS } from './animals/jungleExplorers';
import { DINO_ADVENTURE } from './animals/dinoAdventure';
import { BIRDS_INSECTS } from './animals/birdsInsects';

export const CATEGORIES_V2 = [
  {
    id: 'sea_world',
    nameKey: 'sea_world',
    emoji: '🐠',
    icon: '🌊',
    decorEmojis: ['🐠', '🐙', '🐬'],           // Kart üstü dekoratif emojiler
    gradientColors: ['#74B9FF', '#0984E3'],
    bgColor: '#EBF5FB',
    animals: SEA_WORLD_ANIMALS,
    locked: false,
  },
  {
    id: 'farm_animals',
    nameKey: 'farm_animals',
    emoji: '🐄',
    icon: '🌾',
    decorEmojis: ['🐄', '🐷', '🐔'],
    gradientColors: ['#55EFC4', '#00B894'],
    bgColor: '#EAFAF1',
    animals: FARM_ANIMALS,
    locked: false,
  },
  {
    id: 'forest_friends',
    nameKey: 'forest_friends',
    emoji: '🐻',
    icon: '🌲',
    decorEmojis: ['🐻', '🦊', '🦌'],
    gradientColors: ['#81ECEC', '#00CEC9'],
    bgColor: '#E8F8F5',
    animals: FOREST_FRIENDS,
    locked: false,
  },
  {
    id: 'jungle_explorers',
    nameKey: 'jungle_explorers',
    emoji: '🦁',
    icon: '🌿',
    decorEmojis: ['🦁', '🐯', '🐘'],
    gradientColors: ['#FDCB6E', '#E17055'],
    bgColor: '#FEF9E7',
    animals: JUNGLE_EXPLORERS,
    locked: true,
  },
  {
    id: 'dino_adventure',
    nameKey: 'dino_adventure',
    emoji: '🦖',
    icon: '🌋',
    decorEmojis: ['🦖', '🦕', '🥚'],
    gradientColors: ['#A29BFE', '#6C5CE7'],
    bgColor: '#F5EEF8',
    animals: DINO_ADVENTURE,
    locked: true,
  },
  {
    id: 'birds_insects',
    nameKey: 'birds_insects',
    emoji: '🦋',
    icon: '🌸',
    decorEmojis: ['🦋', '🐝', '🦜'],
    gradientColors: ['#FD79A8', '#E84393'],
    bgColor: '#FDF2F8',
    animals: BIRDS_INSECTS,
    locked: true,
  },
];
