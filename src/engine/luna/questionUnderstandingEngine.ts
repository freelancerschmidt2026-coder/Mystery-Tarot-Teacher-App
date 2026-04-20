export interface QuestionAnalysis {
  raw: string;
  isTarotQuestion: boolean;
  timeFocus: "past" | "present" | "future" | "mixed" | "unknown";
  topic: "love" | "career" | "self" | "spirituality" | "other";
}

export const QuestionUnderstandingEngine = {
  analyze(question: string): QuestionAnalysis {
    const q = (question || "").toLowerCase();

    const isTarotQuestion = q.includes("card") || q.includes("reading");

    let timeFocus: QuestionAnalysis["timeFocus"] = "unknown";
    if (q.includes("past")) timeFocus = "past";
    else if (q.includes("future")) timeFocus = "future";
    else if (q.includes("now") || q.includes("current")) timeFocus = "present";
    else if (q.includes("should") || q.includes("next")) timeFocus = "mixed";

    let topic: QuestionAnalysis["topic"] = "other";
    if (q.includes("love") || q.includes("relationship")) topic = "love";
    else if (q.includes("job") || q.includes("career") || q.includes("work"))
      topic = "career";
    else if (q.includes("me") || q.includes("myself") || q.includes("identity"))
      topic = "self";
    else if (q.includes("spirit") || q.includes("soul") || q.includes("purpose"))
      topic = "spirituality";

    return {
      raw: question,
      isTarotQuestion,
      timeFocus,
      topic,
    };
  },
};

export default QuestionUnderstandingEngine;
