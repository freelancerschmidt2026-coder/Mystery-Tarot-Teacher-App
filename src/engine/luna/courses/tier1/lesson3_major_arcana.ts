import { MultipleChoiceQuestion } from "../types";

export const lesson3_major_arcana = {
  id: "lesson3_major_arcana",
  title: "The Major Arcana Journey",
  body: `
The Major Arcana is the heart of the tarot. It contains 22 cards, numbered from 0 to 21, beginning with The Fool and ending with The World.

These cards represent the “Fool’s Journey,” a symbolic path of growth, transformation, challenge, awakening, and completion. Each card is an archetype — a universal pattern of human experience.

The Fool (0) begins the journey with innocence and curiosity. Along the way, the Fool meets teachers, challenges, temptations, revelations, and moments of deep transformation.

The Major Arcana can be divided into three stages:
1. **The Outer Journey (Cards 0–7)** — learning about the world, identity, and personal power.
2. **The Inner Journey (Cards 8–14)** — facing inner challenges, shadow work, and emotional mastery.
3. **The Spiritual Journey (Cards 15–21)** — confronting illusions, awakening, and completing the cycle.

When a Major Arcana card appears in a reading, it signals that something important is happening — a turning point, a lesson, or a moment of destiny.

Understanding the Major Arcana helps you read the deeper story behind any tarot spread. Luna will guide you through these archetypes as you continue your training.
  `.trim(),

  quiz: [
    {
      id: "q1",
      question: "How many cards are in the Major Arcana?",
      options: [
        { id: "a", label: "22" },
        { id: "b", label: "56" },
        { id: "c", label: "10" },
        { id: "d", label: "78" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q2",
      question: "What is the Major Arcana often called?",
      options: [
        { id: "a", label: "The Fool’s Journey" },
        { id: "b", label: "The Oracle Path" },
        { id: "c", label: "The Minor Story" },
        { id: "d", label: "The Court Cycle" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q3",
      question: "Which card begins the Major Arcana?",
      options: [
        { id: "a", label: "The Magician" },
        { id: "b", label: "The Fool" },
        { id: "c", label: "The World" },
        { id: "d", label: "Strength" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q4",
      question: "Which card ends the Major Arcana?",
      options: [
        { id: "a", label: "Judgement" },
        { id: "b", label: "The Sun" },
        { id: "c", label: "The World" },
        { id: "d", label: "The Tower" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q5",
      question: "What do Major Arcana cards represent?",
      options: [
        { id: "a", label: "Daily routines" },
        { id: "b", label: "Universal archetypes and major life lessons" },
        { id: "c", label: "Only financial matters" },
        { id: "d", label: "Only relationships" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q6",
      question: "Which stage includes shadow work and emotional mastery?",
      options: [
        { id: "a", label: "Outer Journey" },
        { id: "b", label: "Inner Journey" },
        { id: "c", label: "Spiritual Journey" },
        { id: "d", label: "Court Journey" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q7",
      question: "Which stage includes awakening and completion?",
      options: [
        { id: "a", label: "Outer Journey" },
        { id: "b", label: "Inner Journey" },
        { id: "c", label: "Spiritual Journey" },
        { id: "d", label: "Minor Journey" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q8",
      question: "What does a Major Arcana card appearing in a reading usually indicate?",
      options: [
        { id: "a", label: "A small daily event" },
        { id: "b", label: "A major lesson or turning point" },
        { id: "c", label: "A financial transaction" },
        { id: "d", label: "A random coincidence" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q9",
      question: "What number is The Fool?",
      options: [
        { id: "a", label: "1" },
        { id: "b", label: "10" },
        { id: "c", label: "0" },
        { id: "d", label: "21" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q10",
      question: "What is the purpose of learning the Major Arcana?",
      options: [
        { id: "a", label: "To memorize random facts" },
        { id: "b", label: "To understand the deeper story behind readings" },
        { id: "c", label: "To replace intuition" },
        { id: "d", label: "To predict exact dates" }
      ],
      correctOptionId: "b"
    }
  ]
};
