// src/engine/luna/StoreListingEngine.ts

export interface StoreListing {
  listingId: string;
  deckId: string;
  deckName: string;
  memberId: string;
  price: number;
  royaltyPercent: number;
  createdAt: string;
  active: boolean;
}

const STORAGE_KEY_LISTINGS = "mystery_store_listings";

function loadListings(): StoreListing[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_LISTINGS);
  return raw ? JSON.parse(raw) : [];
}

function saveListings(list: StoreListing[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(list));
}

export const StoreListingEngine = {
  /**
   * Add a deck to the store.
   */
  createListing(params: {
    deckId: string;
    deckName: string;
    memberId: string;
    price: number;
    royaltyPercent: number;
  }): StoreListing {
    const list = loadListings();

    const listing: StoreListing = {
      listingId: `listing-${Date.now()}`,
      deckId: params.deckId,
      deckName: params.deckName,
      memberId: params.memberId,
      price: params.price,
      royaltyPercent: params.royaltyPercent,
      createdAt: new Date().toISOString(),
      active: true
    };

    list.push(listing);
    saveListings(list);

    return listing;
  },

  /**
   * Get all active store listings.
   */
  getActiveListings(): StoreListing[] {
    return loadListings().filter((l) => l.active);
  }
};

export default StoreListingEngine;
