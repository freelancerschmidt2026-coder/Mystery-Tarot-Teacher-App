import React from 'react';
import CourseSyllabusTemplate from '../CourseSyllabusTemplate';
import { COURSE_DATA } from '../CourseData';

const Course9Syllabus = ({ onBack }) => {
  return (
    <CourseSyllabusTemplate 
      data={COURSE_DATA[9]} 
      onBack={onBack} 
    />
  );
};

export default Course9Syllabus;
