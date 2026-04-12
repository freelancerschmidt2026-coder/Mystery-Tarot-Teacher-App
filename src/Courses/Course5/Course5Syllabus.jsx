import React from 'react';
import CourseSyllabusTemplate from '../CourseSyllabusTemplate';
import { COURSE_DATA } from '../CourseData';

const Course5Syllabus = ({ onBack }) => {
  return (
    <CourseSyllabusTemplate 
      data={COURSE_DATA[5]} 
      onBack={onBack} 
    />
  );
};

export default Course5Syllabus;
