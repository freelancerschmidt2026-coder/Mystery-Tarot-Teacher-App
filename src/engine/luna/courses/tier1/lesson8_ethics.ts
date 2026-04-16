import { MultipleChoiceQuestion } from "../types";

export const lesson8_ethics = {
  id: "lesson8_ethics",
  title: "Ethics & Emotional Safety",
  body: `
Ethics are essential in tarot reading. A responsible reader creates emotional safety, respects boundaries, and avoids causing harm.

Key ethical principles include:
1. **Do no harm** — readings should support, not frighten or manipulate.
2. **Respect free will** — tarot shows possibilities, not fixed fate.
3. **Avoid medical, legal, or financial predictions** — these require licensed professionals.
4. **Honor privacy** — never read about someone without their consent.
5. **Empower, don’t control** — readings should help the questioner make their own choices.
6. **Stay grounded** — avoid dramatic or absolute statements.
7. **Emotional safety first** — be gentle with sensitive topics.

Luna is designed to follow these principles automatically. As a student, you will learn to read with compassion, clarity, and integrity.

Ethical reading builds trust, confidence, and long‑term skill.
  `.trim(),

  quiz: [
    {
      id: "q1",
      question: "What is the most important ethical principle in tarot?",
      options: [
        { id: "a", label: "Do no harm" },
        { id: "b", label: "Predict exact dates" },
        { id: "c", label: "Control the questioner" },
        { id: "d", label: "Read for anyone without consent" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q2",
      question: "What does tarot show?",
      options: [
        { id: "a", label: "Fixed fate" },
        { id: "b", label: "Possibilities and patterns" },
        { id: "c", label: "Guaranteed outcomes" },
        { id: "d", label: "Exact future events" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q3",
      question: "Which topics should tarot readers avoid predicting?",
      options: [
        { id: "a", label: "Emotions" },
        { id: "b", label: "Medical, legal, and financial outcomes" },
        { id: "c", label: "Creative ideas" },
        { id: "d", label: "Spiritual themes" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q4",
      question: "Why is emotional safety important?",
      options: [
        { id: "a", label: "To manipulate the questioner" },
        { id: "b", label: "To create trust and avoid harm" },
        { id: "c", label: "To make readings dramatic" },
        { id: "d", label: "To replace intuition" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q5",
      question: "What should a reading empower the questioner to do?",
      options: [
        { id: "a", label: "Depend on the reader" },
        { id: "b", label: "Make their own choices" },
        { id: "c", label: "Avoid responsibility" },
        { id: "d", label: "Follow strict rules" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q6",
      question: "Should you read about someone without their consent?",
      options: [
        { id: "a", label: "Yes, always" },
        { id: "b", label: "Only if it's dramatic" },
        { id: "c", label: "No, it's unethical" },
        { id: "d", label: "Only for fun" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q7",
      question: "What does 'do no harm' mean?",
      options: [
        { id: "a", label: "Avoid frightening or manipulating people" },
        { id: "b", label: "Give dramatic predictions" },
        { id: "c", label: "Control the questioner" },
        { id: "d", label: "Ignore emotions" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q8",
      question: "What should you avoid in readings?",
      options: [
        { id: "a", label: "Empathy" },
        { id: "b", label: "Absolute statements" },
        { id: "c", label: "Clarity" },
        { id: "d", label: "Gentleness" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q9",
      question: "What does respecting free will mean?",
      options: [
        { id: "a", label: "Telling people what to do" },
        { id: "b", label: "Letting the cards decide everything" },
        { id: "c", label: "Supporting the questioner’s choices" },
        { id: "d", label: "Ignoring intuition" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q10",
      question: "Why is ethics important in tarot?",
      options: [
        { id: "a", label: "To make readings dramatic" },
        { id: "b", label: "To build trust and avoid harm" },
        { id: "c", label: "To control the questioner" },
        { id: "d", label: "To replace intuition" }
      ],
      correctOptionId: "b"
    }
  ]
};
