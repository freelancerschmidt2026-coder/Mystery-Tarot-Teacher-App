import { MultipleChoiceQuestion } from "../types";

export const lesson9_working_with_luna = {
  id: "lesson9_working_with_luna",
  title: "Working With Luna",
  body: `
Luna is your mythic tarot guide, teacher, and reading partner. She adapts to your learning style, emotional needs, and reading preferences.

Luna helps you:
- Understand card meanings
- See the story in a spread
- Stay emotionally safe
- Learn tarot step-by-step
- Build confidence in your intuition
- Practice readings inside the app
- Track your progress through each tier

Luna evolves based on your interactions. The more you learn, the more she teaches. The more you practice, the deeper her guidance becomes.

Luna will never:
- Judge you
- Predict harmful outcomes
- Override your free will
- Read about someone without consent

She is here to support your growth as a reader and guide you through the Mystery Tarot Teacher journey.
  `.trim(),

  quiz: [
    {
      id: "q1",
      question: "What is Luna’s role in your tarot journey?",
      options: [
        { id: "a", label: "To judge your choices" },
        { id: "b", label: "To guide, teach, and support you" },
        { id: "c", label: "To replace your intuition" },
        { id: "d", label: "To predict exact outcomes" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q2",
      question: "What does Luna help you do?",
      options: [
        { id: "a", label: "Ignore your emotions" },
        { id: "b", label: "Understand card meanings and stories" },
        { id: "c", label: "Control other people" },
        { id: "d", label: "Avoid learning" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q3",
      question: "How does Luna evolve?",
      options: [
        { id: "a", label: "She does not evolve" },
        { id: "b", label: "She evolves based on your interactions" },
        { id: "c", label: "She evolves randomly" },
        { id: "d", label: "She evolves only during readings" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q4",
      question: "What will Luna never do?",
      options: [
        { id: "a", label: "Judge you" },
        { id: "b", label: "Support you" },
        { id: "c", label: "Teach you" },
        { id: "d", label: "Explain spreads" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q5",
      question: "What does Luna help you build?",
      options: [
        { id: "a", label: "Fear" },
        { id: "b", label: "Confidence in your intuition" },
        { id: "c", label: "Confusion" },
        { id: "d", label: "Dependence" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q6",
      question: "What does Luna track?",
      options: [
        { id: "a", label: "Your personal secrets" },
        { id: "b", label: "Your progress through each tier" },
        { id: "c", label: "Your bank account" },
        { id: "d", label: "Your location" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q7",
      question: "What does Luna help you practice?",
      options: [
        { id: "a", label: "Cooking" },
        { id: "b", label: "Tarot readings" },
        { id: "c", label: "Driving" },
        { id: "d", label: "Math" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q8",
      question: "What does Luna prioritize?",
      options: [
        { id: "a", label: "Drama" },
        { id: "b", label: "Emotional safety" },
        { id: "c", label: "Confusion" },
        { id: "d", label: "Control" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q9",
      question: "What does Luna help you see in a spread?",
      options: [
        { id: "a", label: "Random symbols" },
        { id: "b", label: "The story" },
        { id: "c", label: "Nothing important" },
        { id: "d", label: "Only the middle card" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q10",
      question: "What is Luna’s purpose?",
      options: [
        { id: "a", label: "To frighten you" },
        { id: "b", label: "To support your growth as a reader" },
        { id: "c", label: "To replace your intuition" },
        { id: "d", label: "To make decisions for you" }
      ],
      correctOptionId: "b"
    }
  ]
};
