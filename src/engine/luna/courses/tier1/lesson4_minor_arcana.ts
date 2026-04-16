import { MultipleChoiceQuestion } from "../types";

export const lesson4_minor_arcana = {
  id: "lesson4_minor_arcana",
  title: "The Minor Arcana Stories",
  body: `
The Minor Arcana contains 56 cards divided into four suits: Cups, Pentacles, Swords, and Wands. These cards represent everyday experiences, emotions, challenges, and actions.

Each suit tells a story from Ace to 10:
- **Ace** — the beginning, spark, or seed of the suit’s energy.
- **2–10** — the unfolding journey, showing challenges, growth, conflict, harmony, and completion.

The four suits represent:
- **Cups** — emotions, relationships, intuition.
- **Pentacles** — money, work, stability, physical reality.
- **Swords** — thoughts, communication, conflict, clarity.
- **Wands** — passion, creativity, action, inspiration.

The Minor Arcana also includes the **Court Cards**:
- Page — student, messenger, curiosity.
- Knight — action, pursuit, movement.
- Queen — mastery, emotional intelligence, inner power.
- King — leadership, authority, outward mastery.

The Minor Arcana shows how the lessons of the Major Arcana appear in daily life. These cards help you understand the practical, emotional, and mental aspects of a situation.

Luna will help you learn how to read these stories with confidence and intuition.
  `.trim(),

  quiz: [
    {
      id: "q1",
      question: "How many cards are in the Minor Arcana?",
      options: [
        { id: "a", label: "22" },
        { id: "b", label: "56" },
        { id: "c", label: "40" },
        { id: "d", label: "78" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q2",
      question: "Which suit represents emotions and relationships?",
      options: [
        { id: "a", label: "Pentacles" },
        { id: "b", label: "Cups" },
        { id: "c", label: "Swords" },
        { id: "d", label: "Wands" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q3",
      question: "Which suit represents money and the physical world?",
      options: [
        { id: "a", label: "Cups" },
        { id: "b", label: "Pentacles" },
        { id: "c", label: "Wands" },
        { id: "d", label: "Swords" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q4",
      question: "Which suit represents thoughts and communication?",
      options: [
        { id: "a", label: "Wands" },
        { id: "b", label: "Pentacles" },
        { id: "c", label: "Swords" },
        { id: "d", label: "Cups" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q5",
      question: "Which suit represents creativity and passion?",
      options: [
        { id: "a", label: "Wands" },
        { id: "b", label: "Cups" },
        { id: "c", label: "Pentacles" },
        { id: "d", label: "Swords" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q6",
      question: "What does the Ace of each suit represent?",
      options: [
        { id: "a", label: "The end of a cycle" },
        { id: "b", label: "The beginning or spark of the suit’s energy" },
        { id: "c", label: "A random event" },
        { id: "d", label: "A major life lesson" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q7",
      question: "Which Court Card represents curiosity and learning?",
      options: [
        { id: "a", label: "Page" },
        { id: "b", label: "Knight" },
        { id: "c", label: "Queen" },
        { id: "d", label: "King" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q8",
      question: "Which Court Card represents action and pursuit?",
      options: [
        { id: "a", label: "Page" },
        { id: "b", label: "Knight" },
        { id: "c", label: "Queen" },
        { id: "d", label: "King" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q9",
      question: "Which Court Card represents emotional mastery?",
      options: [
        { id: "a", label: "Page" },
        { id: "b", label: "Knight" },
        { id: "c", label: "Queen" },
        { id: "d", label: "King" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q10",
      question: "What do the Minor Arcana primarily represent?",
      options: [
        { id: "a", label: "Daily experiences and practical matters" },
        { id: "b", label: "Only spiritual awakenings" },
        { id: "c", label: "Only major life events" },
        { id: "d", label: "Only past lives" }
      ],
      correctOptionId: "a"
    }
  ]
};
