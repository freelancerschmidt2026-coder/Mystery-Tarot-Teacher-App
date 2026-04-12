import { TarotCard, MajorArcanaCard, MinorArcanaCard } from '../../types';

export function getMeaningForCard(card: TarotCard): string {
  const isMajorArcana = (c: any): c is MajorArcanaCard => c.arcana === 'major';
  const isMinorArcana = (c: any): c is MinorArcanaCard => !!c.suit;

  if (isMajorArcana(card)) return card.upright.experienceSummary;
  if (isMinorArcana(card)) return card.upright;
  return card.uprightMeaning;
}
