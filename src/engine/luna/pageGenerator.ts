import { NotebookPage } from "../../notepad/pages/PageSystem";

export const LunaPageGenerator = {
  generate(): NotebookPage {
    const seed = Math.floor(Math.random() * 999999);

    const titles = [
      "Whisper of the Day",
      "Hidden Insight",
      "Ritual Reflection",
      "Luna’s Guidance",
      "Path of the Finder",
    ];

    const contents = [
      "A quiet truth is forming beneath the surface.",
      "Your intuition is pulling you toward clarity.",
      "A shift in energy invites a new beginning.",
      "The notebook responds to your intention.",
      "Your next step is already unfolding.",
    ];

    return {
      id: `luna-page-${seed}`,
      title: titles[seed % titles.length],
      content: contents[(seed * 3) % contents.length],
    };
  },
};
