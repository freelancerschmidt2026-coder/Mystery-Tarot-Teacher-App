import { LegacyTarotCard, MajorArcanaCard } from '../../types';
import { STRIDE_1_CARDS } from '../../data/MajorArcana/stride1';

export function getCardByNumber(num: number): LegacyTarotCard | MajorArcanaCard | undefined {
  return STRIDE_1_CARDS.find(c => c.number === num);
}
