export interface MultipleChoiceOption {
  id: string;
  label: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: MultipleChoiceOption[];
  correctOptionId: string;
}

export interface LessonContent {
  id: string;
  title: string;
  body: string;
  quiz: MultipleChoiceQuestion[];
}

export const tier1IntroLesson: LessonContent = {
  id: "tier1_intro",
  title: "Tier 1 – What is Tarot?",
  body: `
Tarot is a symbolic language made of 78 cards. It is not about fixed fate, but about stories, patterns, and possibilities.

The deck is divided into 22 Major Arcana and 56 Minor Arcana. The Major Arcana represent big life themes and archetypes. The Minor Arcana represent everyday situations, emotions, actions, and thoughts.

In this app, tarot is used for self-reflection, emotional insight, healing, clarity, and decision support.

A tarot reading is a conversation between the questioner, the cards, the reader, and Luna as guide and interpreter.

Luna’s role is to help you understand the cards, see the story, stay emotionally safe, and grow as a reader.
  `.trim(),
  quiz: [
    {
      id: "q1",
      question: "What is tarot primarily used for in this app?",
      options: [
        { id: "a", label: "Controlling the future" },
        { id: "b", label: "Self-reflection and insight" },
        { id: "c", label: "Predicting lottery numbers" },
        { id: "d", label: "Contacting spirits only" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q2",
      question: "How many cards are in a standard tarot deck?",
      options: [
        { id: "a", label: "52" },
        { id: "b", label: "60" },
        { id: "c", label: "78" },
        { id: "d", label: "44" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q3",
      question: "What are the two main parts of the tarot deck?",
      options: [
        { id: "a", label: "Major Arcana and Oracle Cards" },
        { id: "b", label: "Major Arcana and Minor Arcana" },
        { id: "c", label: "Minor Arcana and Runes" },
        { id: "d", label: "Court Cards and Oracle Cards" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q4",
      question: "What do the Major Arcana represent?",
      options: [
        { id: "a", label: "Only money and career" },
        { id: "b", label: "Only love and relationships" },
        { id: "c", label: "Big life themes and archetypes" },
        { id: "d", label: "Daily chores" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q5",
      question: "What do the Minor Arcana represent?",
      options: [
        { id: "a", label: "Cosmic destiny only" },
        { id: "b", label: "Everyday situations and experiences" },
        { id: "c", label: "Only spiritual awakenings" },
        { id: "d", label: "Only past lives" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q6",
      question: "Which statement best describes tarot in this app?",
      options: [
        { id: "a", label: "It gives fixed, unchangeable predictions." },
        { id: "b", label: "It reflects energy, patterns, and possibilities." },
        { id: "c", label: "It replaces personal responsibility." },
        { id: "d", label: "It is only for entertainment." }
      ],
      correctOptionId: "b"
    },
    {
      id: "q7",
      question: "Who is Luna in the context of this course?",
      options: [
        { id: "a", label: "A random chatbot" },
        { id: "b", label: "A mythic tarot guide and teacher" },
        { id: "c", label: "A payment processor" },
        { id: "d", label: "A calendar app" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q8",
      question: "What is a tarot reading described as in this course?",
      options: [
        { id: "a", label: "A one-way message from the cards" },
        { id: "b", label: "A conversation between the questioner, the cards, the reader, and Luna" },
        { id: "c", label: "A test of psychic powers" },
        { id: "d", label: "A game of chance" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q9",
      question: "What is NOT a purpose of tarot in this app?",
      options: [
        { id: "a", label: "Emotional insight" },
        { id: "b", label: "Healing" },
        { id: "c", label: "Self-reflection" },
        { id: "d", label: "Controlling other people" }
      ],
      correctOptionId: "d"
    },
    {
      id: "q10",
      question: "What is the main goal of Tier 1?",
      options: [
        { id: "a", label: "To memorize every card instantly" },
        { id: "b", label: "To build a foundation for reading and understanding tarot with Luna" },
        { id: "c", label: "To become a professional reader overnight" },
        { id: "d", label: "To replace all intuition with rules" }
      ],
      correctOptionId: "b"
    }
  ]
};

