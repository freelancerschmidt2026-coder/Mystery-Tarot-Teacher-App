import React from 'react';
import PracticeTemplate from './PracticeTemplate';

export default function PracticeTemplateList() {
  const templates = [
    { title: 'Daily Draw', description: 'A simple template for your daily card draw and reflection.' },
    { title: 'Symbol Analysis', description: 'Deep dive into the visual language of a single card.' },
    { title: 'Relationship Spread', description: 'Explore the connection between two archetypes.' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {templates.map((t, i) => <PracticeTemplate key={i} {...t} />)}
    </div>
  );
}
