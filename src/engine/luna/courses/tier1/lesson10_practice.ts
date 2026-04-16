import { MultipleChoiceQuestion } from "../types";

export const lesson10_practice = {
  id: "lesson10_practice",
  title: "Practice Readings",
  body: `
Practice is the foundation of becoming a confident tarot reader. You can study the cards, memorize meanings, and learn spreads — but true mastery comes from reading often, reflecting, and learning from experience.

This final lesson of Tier 1 prepares you to begin real readings with Luna. You will learn how to practice safely, intuitively, and effectively, both inside the app and in your personal practice.

Here are the core principles of tarot practice:

1. **Start simple**  
   Begin with single-card readings or 3-card spreads. These formats help you build confidence without overwhelm. Luna will guide you through both.

2. **Ask clear, open-ended questions**  
   A clear question leads to a clear reading. Avoid yes/no questions. Instead, ask:  
   - “What do I need to understand about…?”  
   - “What energy surrounds…?”  
   - “What is the best path forward?”

3. **Observe before interpreting**  
   Look at the imagery, symbols, colors, and emotions in the card. Let your intuition speak before you look up meanings. Luna will help you connect the symbolism to your question.

4. **Tell the story**  
   Tarot is a narrative. Whether it’s one card or ten, ask:  
   - “What story is unfolding?”  
   - “What is the lesson?”  
   - “What is the energy?”  
   - “What is shifting?”

5. **Use your intuition**  
   Tarot is not about memorizing definitions. It’s about connecting with your inner knowing. Luna will help you strengthen this skill by asking reflective questions during practice readings.

6. **Reflect after each reading**  
   Ask yourself:  
   - “What did I learn?”  
   - “What felt clear?”  
   - “What felt confusing?”  
   - “What patterns do I notice?”  
   Luna will help you track your reflections and progress.

7. **Practice with Luna**  
   Luna can guide you through practice readings, help you interpret spreads, and offer gentle feedback. She will adjust her teaching style based on your progress and comfort level.

8. **Stay grounded and ethical**  
   Remember the principles from Lesson 8: emotional safety, free will, and compassion. Tarot is a tool for empowerment, not fear.

9. **Build consistency**  
   Even 5 minutes a day builds intuition and confidence. Luna will encourage you to practice regularly and celebrate your progress.

10. **You are ready**  
   Completing Tier 1 means you now understand the structure of the tarot, the Major and Minor Arcana, the Court Cards, spreads, ethics, and how to work with Luna. You are ready to begin real readings — both inside the app and in your personal practice.

Luna will now guide you into your first practice reading and help you apply everything you’ve learned.
  `.trim(),

  quiz: [
    {
      id: "q1",
      question: "What is the foundation of becoming a confident tarot reader?",
      options: [
        { id: "a", label: "Memorizing every card perfectly" },
        { id: "b", label: "Practicing readings regularly" },
        { id: "c", label: "Predicting exact outcomes" },
        { id: "d", label: "Using only large spreads" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q2",
      question: "What type of readings should beginners start with?",
      options: [
        { id: "a", label: "10-card spreads" },
        { id: "b", label: "Single-card or 3-card spreads" },
        { id: "c", label: "Past-life spreads only" },
        { id: "d", label: "Shadow spreads only" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q3",
      question: "Which type of question leads to clearer readings?",
      options: [
        { id: "a", label: "Yes/no questions" },
        { id: "b", label: "Vague questions" },
        { id: "c", label: "Clear, open-ended questions" },
        { id: "d", label: "Questions about other people without consent" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q4",
      question: "What should you do before interpreting a card?",
      options: [
        { id: "a", label: "Look up the meaning immediately" },
        { id: "b", label: "Observe the imagery and symbols" },
        { id: "c", label: "Shuffle again" },
        { id: "d", label: "Ignore your intuition" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q5",
      question: "What is tarot primarily described as?",
      options: [
        { id: "a", label: "A strict rulebook" },
        { id: "b", label: "A narrative or story" },
        { id: "c", label: "A guessing game" },
        { id: "d", label: "A scientific formula" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q6",
      question: "What role does intuition play in tarot?",
      options: [
        { id: "a", label: "It is not important" },
        { id: "b", label: "It replaces all card meanings" },
        { id: "c", label: "It helps guide interpretation" },
        { id: "d", label: "It should be ignored" }
      ],
      correctOptionId: "c"
    },
    {
      id: "q7",
      question: "What should you do after each reading?",
      options: [
        { id: "a", label: "Forget it immediately" },
        { id: "b", label: "Reflect on what you learned" },
        { id: "c", label: "Redo the reading until it changes" },
        { id: "d", label: "Ask the same question repeatedly" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q8",
      question: "How can Luna support your practice?",
      options: [
        { id: "a", label: "By judging your mistakes" },
        { id: "b", label: "By guiding and offering feedback" },
        { id: "c", label: "By predicting exact outcomes" },
        { id: "d", label: "By replacing your intuition" }
      ],
      correctOptionId: "b"
    },
    {
      id: "q9",
      question: "Which principle from Lesson 8 applies to practice readings?",
      options: [
        { id: "a", label: "Emotional safety and ethics" },
        { id: "b", label: "Predicting medical outcomes" },
        { id: "c", label: "Reading for others without consent" },
        { id: "d", label: "Making dramatic statements" }
      ],
      correctOptionId: "a"
    },
    {
      id: "q10",
      question: "What does completing Tier 1 prepare you for?",
      options: [
        { id: "a", label: "Advanced astrology" },
        { id: "b", label: "Real tarot readings with Luna" },
        { id: "c", label: "Numerology certification" },
        { id: "d", label: "Palm reading" }
      ],
      correctOptionId: "b"
    }
  ]
};
