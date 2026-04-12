import React from 'react';
import CourseSyllabusTemplate from '../CourseSyllabusTemplate';
import { COURSE_DATA } from '../CourseData';

const Course6Syllabus = ({ onBack }) => {
  return (
    <CourseSyllabusTemplate 
      data={COURSE_DATA[6]} 
      onBack={onBack} 
    />
  );
};

export default Course6Syllabus;
