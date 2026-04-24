// Converts story beats into UI-friendly objects

import { CrossCardStory } from "./CrossCardStoryTypes";

export interface UIStoryBeat {
  id: string;
  description: string;
  animationId: string;
}

export interface UIStory {
  id: string;
  title: string;
  beats: UIStoryBeat[];
}

export class CrossCardStoryUIBridge {
  toUI(story: CrossCardStory): UIStory {
    return {
      id: story.id,
      title: story.title,
      beats: story.beats.map((b) => ({
        id: b.id,
        description: b.description,
        animationId: b.animationId,
      })),
    };
  }
}
