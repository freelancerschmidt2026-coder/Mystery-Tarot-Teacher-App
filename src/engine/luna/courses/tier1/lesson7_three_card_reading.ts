import { MultipleChoiceQuestion } from "../types";

export const lesson7_three_card_reading = {
  id: "lesson7_three_card_reading",
  title: "How to Read a 3‑Card Spread",
  body: `
The 3‑card spread is one of the most versatile and powerful spreads in tarot. It provides clarity, structure, and insight without overwhelming the reader.

A 3‑card spread can be read in many formats, including:
- Past – Present – Future
- Mind – Body – Spirit
- Situation – Challenge – Advice
- You – The Other Person – The Relationship
- Problem – Cause – Solution

When reading a 3‑card spread:
1. **Look at each card individually** — understand its meaning.
2. **Look at the flow** — how the cards relate to each other.
3. **Look at the story** — what the three cards create together.
4. **Look at the suits** — are they emotional (Cups), mental (Swords), practical (Pentacles), or energetic (Wands)?
5. **Look at the balance** — are there Majors? Are there repeating numbers?

A 3‑card spread is a conversation. Each card adds a layer of meaning, and together they reveal a clear message.

Luna will help you learn how to interpret these combinations with confidence and intuition.
  `.trim(),

  quiz: [
    {
      id: "q1",
      question: "What is one common format for a 3‑card spread?",
      options: [
        { id: "a", label: "Past – Present – Future" },
        { id: "b", label: "North – South – East – West" },
        { id: "c", label: "Sun – Moon – Stars" },
        { id: "d", label: "Earth – Air – Fire – Water" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q2",
      question: "What is the first step in reading a 3‑card spread?",
      options: [
        { id: "a", label: "Look at the flow" },
        { id: "b", label: "Look at each card individually" },
        { id: "c", label: "Shuffle again" },
        { id: "d", label: "Ignore the suits" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q3",
      question: "Which of the following is a valid 3‑card format?",
      options: [
        { id: "a", label: "You – The Other Person – The Relationship" },
        { id: "b", label: "Past Life – Present Life – Future Life" },
        { id: "c", label: "North – Center – South" },
        { id: "d", label: "Major – Minor – Court" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q4",
      question: "What does the suit of Cups represent?",
      options: [
        { id: "a", label: "Thoughts and communication" },
        { id: "b", label: "Money and work" },
        { id: "c", label: "Emotions and relationships" },
        { id: "d", label: "Creativity and passion" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q5",
      question: "What does the suit of Swords represent?",
      options: [
        { id: "a", label: "Emotions" },
        { id: "b", label: "Thoughts and communication" },
        { id: "c", label: "Money" },
        { id: "d", label: "Spiritual awakening" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q6",
      question: "What does the presence of Major Arcana in a 3‑card spread indicate?",
      options: [
        { id: "a", label: "A small daily event" },
        { id: "b", label: "A major theme or turning point" },
        { id: "c", label: "A financial issue" },
        { id: "d", label: "A random coincidence" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q7",
      question: "What does repeating numbers in a spread suggest?",
      options: [
        { id: "a", label: "Nothing important" },
        { id: "b", label: "A theme or pattern" },
        { id: "c", label: "A mistake in shuffling" },
        { id: "d", label: "A need to redraw" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q8",
      question: "What is the purpose of a 3‑card spread?",
      options: [
        { id: "a", label: "To overwhelm the reader" },
        { id: "b", label: "To provide clarity and structure" },
        { id: "c", label: "To predict exact dates" },
        { id: "d", label: "To replace intuition" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q9",
      question: "Which suit represents creativity and action?",
      options: [
        { id: "a", label: "Pentacles" },
        { id: "b", label: "Cups" },
        { id: "c", label: "Wands" },
        { id: "d", label: "Swords" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q10",
      question: "What is the final step in reading a 3‑card spread?",
      options: [
        { id: "a", label: "Look at the story the cards create together" },
        { id: "b", label: "Shuffle again" },
        { id: "c", label: "Ignore the suits" },
        { id: "d", label: "Only read the middle card" }
      ],
      correctOptionId: "a"
    }
  ]
};
