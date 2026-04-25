import {
  ModeProfile,
  ModeTriggerContext,
} from "./ModeTypes";

import { ShadowModeEngine } from "./ShadowModeEngine";
import { ManifestationModeEngine } from "./ManifestationModeEngine";

export class LunaModeManager {
  private shadow = new ShadowModeEngine();
  private manifest = new ManifestationModeEngine();

  getMode(context: ModeTriggerContext): ModeProfile {
    if (this.shadow.shouldActivate(context)) {
      return this.shadow.getProfile();
    }

    if (this.manifest.shouldActivate(context)) {
      return this.manifest.getProfile();
    }

    return {
      mode: "DEFAULT",
      uiThemeTag: "neutral",
      lunaMoodBias: "GENTLE",
      animationIntensity: "MEDIUM",
      voiceToneBias: "soft",
      recommendedRituals: [],
      recommendedDeckTags: [],
    };
  }
}
