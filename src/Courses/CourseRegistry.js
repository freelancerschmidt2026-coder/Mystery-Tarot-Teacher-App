import React from 'react';

// Lazy load components to keep bundle size down
const Course1Overview = React.lazy(() => import('./Course1/Course1Overview'));
const Course1Syllabus = React.lazy(() => import('./Course1/Course1Syllabus'));
const Course2Overview = React.lazy(() => import('./Course2/Course2Overview'));
const Course2Syllabus = React.lazy(() => import('./Course2/Course2Syllabus'));
const Course3Overview = React.lazy(() => import('./Course3/Course3Overview'));
const Course3Syllabus = React.lazy(() => import('./Course3/Course3Syllabus'));
const Course4Overview = React.lazy(() => import('./Course4/Course4Overview'));
const Course4Syllabus = React.lazy(() => import('./Course4/Course4Syllabus'));
const Course5Overview = React.lazy(() => import('./Course5/Course5Overview'));
const Course5Syllabus = React.lazy(() => import('./Course5/Course5Syllabus'));
const Course6Overview = React.lazy(() => import('./Course6/Course6Overview'));
const Course6Syllabus = React.lazy(() => import('./Course6/Course6Syllabus'));
const Course7Overview = React.lazy(() => import('./Course7/Course7Overview'));
const Course7Syllabus = React.lazy(() => import('./Course7/Course7Syllabus'));
const Course8Overview = React.lazy(() => import('./Course8/Course8Overview'));
const Course8Syllabus = React.lazy(() => import('./Course8/Course8Syllabus'));
const Course9Overview = React.lazy(() => import('./Course9/Course9Overview'));
const Course9Syllabus = React.lazy(() => import('./Course9/Course9Syllabus'));
const Course10Overview = React.lazy(() => import('./Course10/Course10Overview'));
const Course10Syllabus = React.lazy(() => import('./Course10/Course10Syllabus'));

// Course 1 Lessons
const Course1Lesson1 = React.lazy(() => import('./Course1/Lessons/Lesson1HistoryOfTarot'));
const Course1Lesson2 = React.lazy(() => import('./Course1/Lessons/Lesson2FirstDecks'));
const Course1Lesson3 = React.lazy(() => import('./Course1/Lessons/Lesson3MajorArcanaOverview'));
const Course1Lesson4 = React.lazy(() => import('./Course1/Lessons/Lesson4MinorArcanaOverview'));
const Course1Lesson5 = React.lazy(() => import('./Course1/Lessons/Lesson5FoolsJourney'));

const CourseFinals = React.lazy(() => import('./Finals/CourseFinals'));

export const COURSE_COMPONENTS = {
  1: { 
    overview: Course1Overview, 
    syllabus: Course1Syllabus,
    lessons: {
      1: Course1Lesson1,
      2: Course1Lesson2,
      3: Course1Lesson3,
      4: Course1Lesson4,
      5: Course1Lesson5
    },
    finalExam: CourseFinals
  },
  2: { overview: Course2Overview, syllabus: Course2Syllabus, finalExam: CourseFinals },
  3: { overview: Course3Overview, syllabus: Course3Syllabus, finalExam: CourseFinals },
  4: { overview: Course4Overview, syllabus: Course4Syllabus, finalExam: CourseFinals },
  5: { overview: Course5Overview, syllabus: Course5Syllabus, finalExam: CourseFinals },
  6: { overview: Course6Overview, syllabus: Course6Syllabus, finalExam: CourseFinals },
  7: { overview: Course7Overview, syllabus: Course7Syllabus, finalExam: CourseFinals },
  8: { overview: Course8Overview, syllabus: Course8Syllabus, finalExam: CourseFinals },
  9: { overview: Course9Overview, syllabus: Course9Syllabus, finalExam: CourseFinals },
  10: { overview: Course10Overview, syllabus: Course10Syllabus, finalExam: CourseFinals },
};
