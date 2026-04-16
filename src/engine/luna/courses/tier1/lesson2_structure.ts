import { MultipleChoiceQuestion } from "../types";

export const lesson2_structure = {
  id: "lesson2_structure",
  title: "Structure of the Tarot",
  body: `
The tarot is made of 78 cards, divided into two main groups: the Major Arcana and the Minor Arcana.

The **Major Arcana** contains 22 cards, numbered from 0 to 21. These cards represent major life themes, archetypes, spiritual lessons, and turning points. They describe the soul’s journey through transformation, awakening, challenge, and growth.

The **Minor Arcana** contains 56 cards, divided into four suits:
- **Cups** (emotions, relationships, intuition)
- **Pentacles** (money, work, stability, the physical world)
- **Swords** (thoughts, communication, conflict, clarity)
- **Wands** (creativity, passion, action, inspiration)

Each suit has:
- **Ace through 10** (representing stages of a story or cycle)
- **Four Court Cards**:
  - Page
  - Knight
  - Queen
  - King

The Minor Arcana shows everyday experiences, emotional patterns, decisions, and challenges. The Major Arcana shows the bigger forces shaping your life.

Together, the 78 cards form a symbolic map of the human experience — from the smallest daily choices to the biggest spiritual transformations.

Understanding the structure of the tarot helps you read with clarity, confidence, and intuition. Luna will guide you through how these pieces fit together as you continue your training.
  `.trim(),

  quiz: [
    {
      id: "q1",
      question: "How many cards are in the tarot deck?",
      options: [
        { id: "a", label: "56" },
        { id: "b", label: "78" },
        { id: "c", label: "22" },
        { id: "d", label: "100" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q2",
      question: "How many cards are in the Major Arcana?",
      options: [
        { id: "a", label: "22" },
        { id: "b", label: "56" },
        { id: "c", label: "10" },
        { id: "d", label: "4" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q3",
      question: "What do the Major Arcana represent?",
      options: [
        { id: "a", label: "Daily routines" },
        { id: "b", label: "Big life themes and archetypes" },
        { id: "c", label: "Only financial matters" },
        { id: "d", label: "Only relationships" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q4",
      question: "How many suits are in the Minor Arcana?",
      options: [
        { id: "a", label: "2" },
        { id: "b", label: "3" },
        { id: "c", label: "4" },
        { id: "d", label: "5" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q5",
      question: "Which suit represents emotions and relationships?",
      options: [
        { id: "a", label: "Swords" },
        { id: "b", label: "Pentacles" },
        { id: "c", label: "Cups" },
        { id: "d", label: "Wands" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q6",
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
      id: "q7",
      question: "Which suit represents thoughts and communication?",
      options: [
        { id: "a", label: "Pentacles" },
        { id: "b", label: "Cups" },
        { id: "c", label: "Swords" },
        { id: "d", label: "Wands" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q8",
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
      id: "q9",
      question: "How many Court Cards are in each suit?",
      options: [
        { id: "a", label: "2" },
        { id: "b", label: "3" },
        { id: "c", label: "4" },
        { id: "d", label: "5" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q10",
      question: "What do the Minor Arcana represent?",
      options: [
        { id: "a", label: "Everyday experiences and situations" },
        { id: "b", label: "Only spiritual awakenings" },
        { id: "c", label: "Only major life events" },
        { id: "d", label: "Only past lives" }
      ],
      correctOptionId: "a"
    }
  ]
};
