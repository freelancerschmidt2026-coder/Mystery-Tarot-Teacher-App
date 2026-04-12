import { LegacyTarotCard, MajorArcanaCard } from '../../types';

export const STRIDE_1_CARDS: (LegacyTarotCard | MajorArcanaCard)[] = [
  {
    "id": "major_00_fool",
    "number": 0,
    "name": "The Fool",
    "arcana": "major",
    "upright": {
      "world": "Short description of the cinematic world",
      "mechanic": "Name of the core interactive mechanic",
      "prompt": "Exact user-facing question Luna asks",
      "experienceSummary": "1–3 sentence summary of what happens in this mode",
      "reward": {
        "type": "charm",
        "name": "Name of the reward",
        "description": "Short description of what it represents or does"
      },
      "featureUnlock": {
        "enabled": true,
        "name": "Name of feature (if any)",
        "description": "What this feature does in the app"
      }
    },
    "reversed": {
      "world": "Short description of the reversed world",
      "mechanic": "Name of the reversed mechanic",
      "prompt": "Exact user-facing question Luna asks",
      "experienceSummary": "1–3 sentence summary of what happens in this mode",
      "reward": {
        "type": "charm",
        "name": "Name of the reward",
        "description": "Short description of what it represents or does"
      },
      "featureUnlock": {
        "enabled": true,
        "name": "Name of feature (if any)",
        "description": "What this feature does in the app"
      }
    }
  },
  {
    id: '1',
    name: 'The Magician',
    number: 1,
    symbol: 'The Infinity Symbol',
    uprightMeaning: 'Manifestation, resourcefulness, power, inspired action.',
    reversedMeaning: 'Manipulation, poor planning, untapped talents.',
    emotionalTone: 'Confident, focused, creative.',
    keywords: ['Manifestation', 'Resourcefulness', 'Power', 'Action']
  },
  {
    id: '2',
    name: 'The High Priestess',
    number: 2,
    symbol: 'The Crescent Moon',
    uprightMeaning: 'Intuition, sacred knowledge, divine feminine, the subconscious mind.',
    reversedMeaning: 'Secrets, disconnected from intuition, withdrawal and silence.',
    emotionalTone: 'Mysterious, calm, intuitive.',
    keywords: ['Intuition', 'Sacred Knowledge', 'Subconscious', 'Divine Feminine']
  },
  {
    id: '3',
    name: 'The Empress',
    number: 3,
    symbol: 'The Pomegranate',
    uprightMeaning: 'Femininity, beauty, nature, nurturing, abundance.',
    reversedMeaning: 'Creative block, dependence on others.',
    emotionalTone: 'Nurturing, abundant, creative.',
    keywords: ['Femininity', 'Beauty', 'Nature', 'Abundance']
  },
  {
    id: '4',
    name: 'The Emperor',
    number: 4,
    symbol: 'The Ankh',
    uprightMeaning: 'Authority, establishment, structure, a father figure.',
    reversedMeaning: 'Domination, excessive control, lack of discipline, inflexibility.',
    emotionalTone: 'Authoritative, structured, disciplined.',
    keywords: ['Authority', 'Structure', 'Control', 'Father Figure']
  },
  {
    id: '5',
    name: 'The Hierophant',
    number: 5,
    symbol: 'The Triple Crown',
    uprightMeaning: 'Spiritual wisdom, religious beliefs, conformity, tradition, institutions.',
    reversedMeaning: 'Personal beliefs, freedom, challenging the status quo.',
    emotionalTone: 'Traditional, wise, formal.',
    keywords: ['Tradition', 'Wisdom', 'Beliefs', 'Conformity']
  },
  {
    id: '6',
    name: 'The Lovers',
    number: 6,
    symbol: 'The Angel',
    uprightMeaning: 'Love, harmony, relationships, values alignment, choices.',
    reversedMeaning: 'Self-love, disharmony, imbalance, misalignment of values.',
    emotionalTone: 'Harmonious, passionate, decisive.',
    keywords: ['Love', 'Harmony', 'Relationships', 'Choices']
  },
  {
    id: '7',
    name: 'The Chariot',
    number: 7,
    symbol: 'The Sphinxes',
    uprightMeaning: 'Control, willpower, success, action, determination.',
    reversedMeaning: 'Self-discipline, opposition, lack of direction.',
    emotionalTone: 'Determined, victorious, intense.',
    keywords: ['Control', 'Willpower', 'Success', 'Determination']
  },
  {
    id: '8',
    name: 'Strength',
    number: 8,
    symbol: 'The Lion',
    uprightMeaning: 'Strength, courage, persuasion, influence, compassion.',
    reversedMeaning: 'Inner strength, self-doubt, low energy, raw emotion.',
    emotionalTone: 'Courageous, gentle, resilient.',
    keywords: ['Strength', 'Courage', 'Influence', 'Compassion']
  },
  {
    id: '10',
    name: 'Wheel of Fortune',
    number: 10,
    symbol: 'The Wheel',
    uprightMeaning: 'Good luck, karma, life cycles, destiny, a turning point.',
    reversedMeaning: 'Bad luck, resistance to change, breaking cycles.',
    emotionalTone: 'Dynamic, fated, cyclical.',
    keywords: ['Luck', 'Karma', 'Cycles', 'Destiny']
  }
];
