// LunaCourseCreationEngine.js
// Generates course proposals, lesson structures, metadata, and handles GateKeeper approvals

export const LunaCourseCreationEngine = {
  courses: [],

  proposeCourse({ title, theme, targetLevel }) {
    const courseId = `course_${Date.now()}`;

    const course = {
      courseId,
      title,
      theme,
      targetLevel,
      lessons: [],
      status: "PROPOSED", // PROPOSED | APPROVED | PUBLISHED
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.courses.push(course);
    return course;
  },

  addLesson(courseId, { title, description }) {
    const course = this.courses.find(c => c.courseId === courseId);
    if (!course) return null;

    const lesson = {
      lessonId: `lesson_${Date.now()}`,
      title,
      description
    };

    course.lessons.push(lesson);
    course.updatedAt = new Date().toISOString();
    return lesson;
  },

  approveCourse(courseId) {
    const course = this.courses.find(c => c.courseId === courseId);
    if (!course) return null;

    course.status = "APPROVED";
    course.updatedAt = new Date().toISOString();
    return course;
  },

  publishCourse(courseId) {
    const course = this.courses.find(c => c.courseId === courseId);
    if (!course) return null;

    course.status = "PUBLISHED";
    course.updatedAt = new Date().toISOString();
    return course;
  },

  getCourse(courseId) {
    return this.courses.find(c => c.courseId === courseId) || null;
  }
};
