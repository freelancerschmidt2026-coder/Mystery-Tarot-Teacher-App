import React from 'react';
import CourseSyllabusTemplate from '../CourseSyllabusTemplate';
import { COURSE_DATA } from '../CourseData';

const Course3Syllabus = ({ onBack }) => {
  return (
    <CourseSyllabusTemplate 
      data={COURSE_DATA[3]} 
      onBack={onBack} 
    />
  );
};

export default Course3Syllabus;
