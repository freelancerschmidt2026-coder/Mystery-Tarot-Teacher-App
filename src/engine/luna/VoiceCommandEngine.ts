// src/engine/luna/VoiceCommandEngine.ts

export type VoiceIntent =
  | "focus_card"
  | "focus_group"
  | "next_card"
  | "previous_card"
  | "open_purchased_templates"
  | "design_with_luna_on"
  | "design_with_luna_off"
  | "unknown";

export interface VoiceCommandResult {
  intent: VoiceIntent;
  target?: string;
}

export const VoiceCommandEngine = {
  /**
   * Parse a voice command into an intent.
   */
  parse(command: string): VoiceCommandResult {
    const c = command.toLowerCase();

    if (c.includes("show me") || c.includes("bring me")) {
      return { intent: "focus_card", target: c };
    }

    if (c.includes("cups") || c.includes("swords") || c.includes("coins") || c.includes("wands")) {
      return { intent: "focus_group", target: c };
    }

    if (c.includes("next card")) return { intent: "next_card" };
    if (c.includes("previous card")) return { intent: "previous_card" };

    if (c.includes("open my purchased templates"))
      return { intent: "open_purchased_templates" };

    if (c.includes("design with luna on"))
      return { intent: "design_with_luna_on" };

    if (c.includes("design with luna off"))
      return { intent: "design_with_luna_off" };

    return { intent: "unknown" };
  }
};

export default VoiceCommandEngine;
