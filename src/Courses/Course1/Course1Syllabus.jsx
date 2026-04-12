import React from 'react';
import CourseSyllabusTemplate from '../CourseSyllabusTemplate';
import { COURSE_DATA } from '../CourseData';

const Course1Syllabus = ({ onBack, onSelectLesson, onSelectWorksheet, onSelectArcade }) => {
  return (
    <CourseSyllabusTemplate 
      data={COURSE_DATA[1]} 
      onBack={onBack} 
      onSelectLesson={onSelectLesson}
      onSelectWorksheet={onSelectWorksheet}
      onSelectArcade={onSelectArcade}
    />
  );
};

export default Course1Syllabus;
