// Rules for generating story beats based on card roles + spread structure

import {
  CardStoryRole,
  StoryBeat,
} from "./CrossCardStoryTypes";

let beatCounter = 0;

export class CrossCardStoryRules {
  generateBeats(roles: CardStoryRole[]): StoryBeat[] {
    const beats: StoryBeat[] = [];

    const past = roles.find((r) => r.role === "PAST");
    const present = roles.find((r) => r.role === "PRESENT");
    const future = roles.find((r) => r.role === "FUTURE");
    const obstacle = roles.find((r) => r.role === "OBSTACLE");
    const ally = roles.find((r) => r.role === "ALLY");

    if (past) {
      beats.push(this.createBeat("The past steps forward, revealing what shaped this moment."));
    }

    if (present) {
      beats.push(this.createBeat("The present card responds, showing what is unfolding now."));
    }

    if (obstacle) {
      beats.push(this.createBeat("An obstacle rises, challenging the path ahead."));
    }

    if (ally) {
      beats.push(this.createBeat("An ally appears, offering support and guidance."));
    }

    if (future) {
      beats.push(this.createBeat("The future card illuminates the direction this story is heading."));
    }

    return beats;
  }

  private createBeat(description: string): StoryBeat {
    return {
      id: `STORY_BEAT_${++beatCounter}`,
      description,
      animationId: `ANIM_STORY_${beatCounter}`,
      voiceLine: description,
    };
  }
}
