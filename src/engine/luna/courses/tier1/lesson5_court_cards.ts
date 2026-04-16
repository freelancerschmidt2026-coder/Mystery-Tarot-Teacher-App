import { MultipleChoiceQuestion } from "../types";

export const lesson5_court_cards = {
  id: "lesson5_court_cards",
  title: "Court Cards as People & Energies",
  body: `
The Court Cards represent personality types, roles, energies, and stages of maturity. Each suit has four Court Cards: Page, Knight, Queen, and King.

These cards can represent:
- A person in the questioner’s life
- A part of the questioner themselves
- A role the questioner is stepping into
- An energy influencing the situation

**Page** — curiosity, learning, messages, new beginnings  
**Knight** — action, pursuit, movement, ambition  
**Queen** — emotional intelligence, mastery, inner power  
**King** — leadership, authority, outward mastery

Court Cards combine:
- The personality role (Page, Knight, Queen, King)
- The suit’s energy (Cups, Pentacles, Swords, Wands)

For example:
- Queen of Cups = emotional wisdom  
- Knight of Swords = fast action and sharp communication  
- Page of Pentacles = student of money or skills  
- King of Wands = visionary leader  

Understanding Court Cards helps you read people, energies, and dynamics in any tarot spread.
  `.trim(),

  quiz: [
    {
      id: "q1",
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
      id: "q2",
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
      id: "q3",
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
      id: "q4",
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
      id: "q5",
      question: "Which Court Card represents leadership and authority?",
      options: [
        { id: "a", label: "Page" },
        { id: "b", label: "Knight" },
        { id: "c", label: "Queen" },
        { id: "d", label: "King" }
      ],
      correctOptionId: "d"
    },
    {
      id: "q6",
      question: "What do Court Cards represent?",
      options: [
        { id: "a", label: "Only major life events" },
        { id: "b", label: "People, roles, and energies" },
        { id: "c", label: "Only financial matters" },
        { id: "d", label: "Only past lives" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q7",
      question: "What does the Queen of Cups represent?",
      options: [
        { id: "a", label: "Fast action" },
        { id: "b", label: "Emotional wisdom" },
        { id: "c", label: "Material success" },
        { id: "d", label: "Conflict" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q8",
      question: "What does the Knight of Swords represent?",
      options: [
        { id: "a", label: "Slow progress" },
        { id: "b", label: "Emotional healing" },
        { id: "c", label: "Fast action and sharp communication" },
        { id: "d", label: "Financial stability" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q9",
      question: "What does the Page of Pentacles represent?",
      options: [
        { id: "a", label: "A student of money or skills" },
        { id: "b", label: "A spiritual awakening" },
        { id: "c", label: "A major life event" },
        { id: "d", label: "A romantic partner" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q10",
      question: "What does the King of Wands represent?",
      options: [
        { id: "a", label: "Visionary leadership" },
        { id: "b", label: "Emotional confusion" },
        { id: "c", label: "Financial loss" },
        { id: "d", label: "Avoidance" }
      ],
      correctOptionId: "a"
    }
  ]
};
