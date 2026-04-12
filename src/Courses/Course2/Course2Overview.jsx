import React from 'react';
import CourseOverviewTemplate from '../CourseOverviewTemplate';
import { COURSE_DATA } from '../CourseData';

const Course2Overview = ({ onStart, onViewSyllabus }) => {
  return (
    <CourseOverviewTemplate 
      data={COURSE_DATA[2]} 
      onStart={onStart} 
      onViewSyllabus={onViewSyllabus} 
    />
  );
};

export default Course2Overview;
