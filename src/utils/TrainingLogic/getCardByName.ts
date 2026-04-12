import { LegacyTarotCard, MajorArcanaCard } from '../../types';
import { STRIDE_1_CARDS } from '../../data/MajorArcana/stride1';

export function getCardByName(name: string): LegacyTarotCard | MajorArcanaCard | undefined {
  return STRIDE_1_CARDS.find(c => c.name === name);
}
