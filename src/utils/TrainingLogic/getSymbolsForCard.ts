import { TarotCard, MajorArcanaCard, MinorArcanaCard } from '../../types';

export function getSymbolsForCard(card: TarotCard): string[] {
  const isMajorArcana = (c: any): c is MajorArcanaCard => c.arcana === 'major';
  const isMinorArcana = (c: any): c is MinorArcanaCard => !!c.suit;

  if (isMajorArcana(card)) return ["Major Arcana"];
  if (isMinorArcana(card)) return [card.suitDesign.symbol.name];
  return [card.symbol];
}
