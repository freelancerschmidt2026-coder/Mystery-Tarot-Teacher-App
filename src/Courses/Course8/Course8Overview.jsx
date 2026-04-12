import React from 'react';
import CourseOverviewTemplate from '../CourseOverviewTemplate';
import { COURSE_DATA } from '../CourseData';

const Course8Overview = ({ onStart, onViewSyllabus }) => {
  return (
    <CourseOverviewTemplate 
      data={COURSE_DATA[8]} 
      onStart={onStart} 
      onViewSyllabus={onViewSyllabus} 
    />
  );
};

export default Course8Overview;
