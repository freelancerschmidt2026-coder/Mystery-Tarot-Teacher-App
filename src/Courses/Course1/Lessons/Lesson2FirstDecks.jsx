import React from 'react';
import LessonTemplate from '../../LessonTemplate';

const Lesson2FirstDecks = ({ onBack, onComplete }) => {
  const content = (
    <>
      <p>
        The first Tarot decks were hand-painted, luxury items, created for the 
        Italian nobility. These decks were not just for play; they were 
        masterpieces of Renaissance art.
      </p>
      
      <h2>The Visconti-Sforza Decks</h2>
      <p>
        The Visconti-Sforza decks are the oldest surviving Tarot cards. 
        Commissioned by the Visconti and Sforza families in the mid-15th century, 
        these cards were painted with gold leaf and vibrant pigments. 
        They featured allegorical figures, mythological scenes, and family crests.
      </p>
      
      <blockquote>
        "The Visconti-Sforza cards were symbols of power, wealth, and intellectual 
        sophistication."
      </blockquote>

      <h2>The Tarot of Marseilles</h2>
      <p>
        As printing technology advanced, Tarot became more accessible. 
        The Tarot of Marseilles (Tarot de Marseille) emerged in the 17th century 
        as a standardized, woodblock-printed deck. Its bold colors and 
        iconic designs became the foundation for many modern Tarot decks.
      </p>

      <h2>The Rider-Waite-Smith Deck</h2>
      <p>
        In 1909, Arthur Edward Waite and Pamela Colman Smith created the 
        Rider-Waite-Smith (RWS) deck. This deck was a major departure from 
        previous designs, as it featured detailed illustrations for the 
        Minor Arcana, making the cards more intuitive and accessible for 
        modern readers.
      </p>
    </>
  );

  return (
    <LessonTemplate 
      title="The First Decks" 
      lessonNumber={2} 
      content={content} 
      onBack={onBack} 
      onComplete={onComplete} 
    />
  );
};

export default Lesson2FirstDecks;
