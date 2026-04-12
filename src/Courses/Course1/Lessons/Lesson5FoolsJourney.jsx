import React from 'react';
import LessonTemplate from '../../LessonTemplate';

const Lesson5FoolsJourney = ({ onBack, onComplete }) => {
  const content = (
    <>
      <p>
        The Fool's Journey is a metaphor for the human experience, 
        represented by the 22 Major Arcana cards. It is the story of 
        the soul's evolution, from birth to spiritual enlightenment.
      </p>
      
      <h2>The Fool's Leap</h2>
      <p>
        The Fool is the first card of the Major Arcana, representing 
        new beginnings, innocence, and the leap of faith. The Fool 
        is the protagonist of the journey, the one who takes the 
        first step into the unknown.
      </p>
      
      <blockquote>
        "The Fool's Journey is the story of our lives, reflecting 
        our growth, challenges, and triumphs."
      </blockquote>

      <h2>The Stages of the Journey</h2>
      <ul>
        <li><b>Birth:</b> The Fool, The Magician, The High Priestess, The Empress, The Emperor, The Hierophant.</li>
        <li><b>Adolescence:</b> The Lovers, The Chariot, Strength, The Hermit, Wheel of Fortune, Justice.</li>
        <li><b>Adulthood:</b> The Hanged Man, Death, Temperance, The Devil, The Tower, The Star, The Moon, The Sun.</li>
        <li><b>Maturity:</b> Judgement, The World.</li>
      </ul>

      <h2>The Final Destination</h2>
      <p>
        The World is the final card of the Major Arcana, representing 
        completion, wholeness, and the fulfillment of the journey. 
        The Fool has reached the end of the road, and is now a 
        master of the Tarot's wisdom.
      </p>
    </>
  );

  return (
    <LessonTemplate 
      title="The Fool's Journey" 
      lessonNumber={5} 
      content={content} 
      onBack={onBack} 
      onComplete={onComplete} 
    />
  );
};

export default Lesson5FoolsJourney;
