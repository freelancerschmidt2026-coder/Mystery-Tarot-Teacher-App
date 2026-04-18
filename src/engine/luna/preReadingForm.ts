// src/engine/luna/preReadingForm.ts

export type PreReadingField = {
  id: string;
  label: string;
  type: "text" | "textarea" | "choice";
  required: boolean;
  options?: string[];
};

export type PreReadingForm = {
  id: string;
  title: string;
  description: string;
  fields: PreReadingField[];
};

export const preReadingForm: PreReadingForm = {
  id: "default_pre_reading_form",
  title: "Before Your Reading",
  description:
    "Luna uses your answers to tune the energy of the reading, choose the right spread, and understand your intention.",
  fields: [
    {
      id: "main_question",
      label: "What is the main question or situation you want clarity on?",
      type: "textarea",
      required: true
    },
    {
      id: "emotion_state",
      label: "How are you feeling right now?",
      type: "choice",
      required: true,
      options: [
        "Calm",
        "Hopeful",
        "Confused",
        "Anxious",
        "Excited",
        "Heavy-hearted",
        "Neutral"
      ]
    },
    {
      id: "reading_focus",
      label: "What area does your question relate to?",
      type: "choice",
      required: true,
      options: [
        "Love & Relationships",
        "Career & Purpose",
        "Finances",
        "Spiritual Growth",
        "Shadow Work",
        "General Guidance"
      ]
    },
    {
      id: "additional_context",
      label: "Is there anything else Luna should know before the reading?",
      type: "textarea",
      required: false
    }
  ]
};

// Helper: Luna uses this to interpret the form
export function interpretPreReadingForm(answers: Record<string, string>) {
  return {
    question: answers.main_question || "",
    emotion: answers.emotion_state || "Neutral",
    focus: answers.reading_focus || "General Guidance",
    context: answers.additional_context || ""
  };
}
