import React from 'react';
import CourseOverviewTemplate from '../CourseOverviewTemplate';
import { COURSE_DATA } from '../CourseData';

const Course6Overview = ({ onStart, onViewSyllabus }) => {
  return (
    <CourseOverviewTemplate 
      data={COURSE_DATA[6]} 
      onStart={onStart} 
      onViewSyllabus={onViewSyllabus} 
    />
  );
};

export default Course6Overview;
