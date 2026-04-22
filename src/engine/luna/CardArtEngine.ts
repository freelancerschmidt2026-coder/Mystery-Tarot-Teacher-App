// src/engine/luna/CardArtEngine.ts

export interface CardArtData {
  cardId: string;
  artId: string;          // internal reference
  url: string;            // image URL or data URI
  altText: string;
  styleTags: string[];    // e.g. ["celestial", "minimal", "gold"]
  isPlaceholder: boolean;
}

export const CardArtEngine = {
  initPlaceholder(cardId: string): CardArtData {
    return {
      cardId,
      artId: `placeholder-${cardId}`,
      url: "",
      altText: "Placeholder art",
      styleTags: [],
      isPlaceholder: true
    };
  },

  setArt(
    current: CardArtData,
    params: { artId: string; url: string; altText: string; styleTags?: string[] }
  ): CardArtData {
    return {
      cardId: current.cardId,
      artId: params.artId,
      url: params.url,
      altText: params.altText,
      styleTags: params.styleTags ?? [],
      isPlaceholder: false
    };
  },

  updateStyleTags(current: CardArtData, tags: string[]): CardArtData {
    return {
      ...current,
      styleTags: tags
    };
  }
};

export default CardArtEngine;
