export const questionUnderstandingEngine = {
  analyzeQuestion: (question) => {
    const q = question.toLowerCase();
    let category = 'general';
    let needsClarification = false;

    if (q.includes('love') || q.includes('relationship') || q.includes('partner')) {
      category = 'love';
    } else if (q.includes('career') || q.includes('job') || q.includes('money') || q.includes('work')) {
      category = 'career';
    } else if (q.includes('spiritual') || q.includes('growth') || q.includes('soul')) {
      category = 'spiritual';
    }

    if (question.length < 10) {
      needsClarification = true;
    }

    return { category, needsClarification };
  },
  getClarificationPrompt: (category) => {
    switch (category) {
      case 'love': return "Luna senses a focus on the heart. Could you elaborate on the specific dynamic or feeling you wish to explore?";
      case 'career': return "The path of work and material stability is complex. What specific aspect of your professional journey is calling for insight?";
      case 'spiritual': return "The soul's evolution is a deep well. What specific internal shift or spiritual question are you holding?";
      default: return "The veil is thick. Could you provide more context or rephrase your question to help Luna see more clearly?";
    }
  }
};
