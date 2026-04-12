import React from 'react';
import CourseOverviewTemplate from '../CourseOverviewTemplate';
import { COURSE_DATA } from '../CourseData';

const Course4Overview = ({ onStart, onViewSyllabus }) => {
  return (
    <CourseOverviewTemplate 
      data={COURSE_DATA[4]} 
      onStart={onStart} 
      onViewSyllabus={onViewSyllabus} 
    />
  );
};

export default Course4Overview;
