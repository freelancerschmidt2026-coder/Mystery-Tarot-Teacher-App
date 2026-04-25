// CoursesProgressEngine.js
// Tracks member progress through courses and lessons

export const CoursesProgressEngine = {
  progress: [],

  startCourse(userId, courseId) {
    const entry = {
      progressId: `prog_${Date.now()}`,
      userId,
      courseId,
      completedLessons: [],
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.progress.push(entry);
    return entry;
  },

  completeLesson(userId, courseId, lessonId) {
    const entry = this.progress.find(
      p => p.userId === userId && p.courseId === courseId
    );

    if (!entry) return null;

    if (!entry.completedLessons.includes(lessonId)) {
      entry.completedLessons.push(lessonId);
    }

    entry.updatedAt = new Date().toISOString();
    return entry;
  },

  getProgress(userId, courseId) {
    return this.progress.find(
      p => p.userId === userId && p.courseId === courseId
    ) || null;
  }
};
