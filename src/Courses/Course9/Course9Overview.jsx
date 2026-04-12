import React from 'react';
import CourseOverviewTemplate from '../CourseOverviewTemplate';
import { COURSE_DATA } from '../CourseData';

const Course9Overview = ({ onStart, onViewSyllabus }) => {
  return (
    <CourseOverviewTemplate 
      data={COURSE_DATA[9]} 
      onStart={onStart} 
      onViewSyllabus={onViewSyllabus} 
    />
  );
};

export default Course9Overview;
