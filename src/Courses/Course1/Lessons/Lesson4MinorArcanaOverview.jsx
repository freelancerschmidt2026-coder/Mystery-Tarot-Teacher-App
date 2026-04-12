import React from 'react';
import LessonTemplate from '../../LessonTemplate';

const Lesson4MinorArcanaOverview = ({ onBack, onComplete }) => {
  const content = (
    <>
      <p>
        The Minor Arcana are the 56 cards of the Tarot that represent 
        the everyday events, challenges, and opportunities of our lives. 
        They are the "small" cards that speak to the practicalities of 
        our existence.
      </p>
      
      <h2>The Four Suits</h2>
      <p>
        The Minor Arcana are divided into four suits, each representing 
        a different aspect of our lives:
      </p>
      
      <ul>
        <li><b>Wands:</b> Creativity, passion, and the fire of the spirit.</li>
        <li><b>Cups:</b> Emotions, relationships, and the water of the heart.</li>
        <li><b>Swords:</b> Intellect, communication, and the air of the mind.</li>
        <li><b>Pentacles:</b> Materialism, work, and the earth of the body.</li>
      </ul>
      
      <blockquote>
        "The Minor Arcana are the mirrors of our daily lives, reflecting 
        our joys, sorrows, and struggles."
      </blockquote>

      <h2>The Court Cards</h2>
      <p>
        Each suit has four court cards: Page, Knight, Queen, and King. 
        These cards represent people, personality traits, or stages 
        of development.
      </p>

      <h2>The Numbered Cards</h2>
      <p>
        Each suit has ten numbered cards, from Ace to Ten. These cards 
        represent the progression of a situation or the development 
        of a theme.
      </p>
    </>
  );

  return (
    <LessonTemplate 
      title="The Minor Arcana Overview" 
      lessonNumber={4} 
      content={content} 
      onBack={onBack} 
      onComplete={onComplete} 
    />
  );
};

export default Lesson4MinorArcanaOverview;
