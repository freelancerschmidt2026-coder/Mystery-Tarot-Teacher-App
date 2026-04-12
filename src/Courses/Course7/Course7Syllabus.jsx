import React from 'react';
import CourseSyllabusTemplate from '../CourseSyllabusTemplate';
import { COURSE_DATA } from '../CourseData';

const Course7Syllabus = ({ onBack }) => {
  return (
    <CourseSyllabusTemplate 
      data={COURSE_DATA[7]} 
      onBack={onBack} 
    />
  );
};

export default Course7Syllabus;
