import React from 'react';
import LessonTemplate from '../../LessonTemplate';

const Lesson1HistoryOfTarot = ({ onBack, onComplete }) => {
  const content = (
    <>
      <p>
        The history of Tarot is a tapestry woven with threads of mystery, art, and human intuition. 
        Contrary to popular belief, Tarot did not originate in ancient Egypt or as a secret code 
        for mystical societies. Its roots are more grounded, yet equally fascinating.
      </p>
      
      <h2>The Italian Renaissance</h2>
      <p>
        Tarot first appeared in mid-15th century Italy as a card game known as <i>tarocchini</i> or <i>trionfi</i> (triumphs). 
        These early decks were hand-painted masterpieces commissioned by wealthy families like the Visconti and Sforza.
      </p>
      
      <blockquote>
        "Tarot was born in the light of the Renaissance, a time of rebirth for art, science, and the human spirit."
      </blockquote>

      <h2>From Game to Divination</h2>
      <p>
        For centuries, Tarot remained a parlor game. It wasn't until the late 18th century that 
        occultists in France began to see deeper meanings in the cards. Antoine Court de Gébelin 
        and Jean-Baptiste Alliette (Etteilla) were among the first to link Tarot to ancient 
        wisdom and use it for divination.
      </p>

      <h2>The Modern Era</h2>
      <p>
        The 20th century saw the birth of the Rider-Waite-Smith deck, which revolutionized 
        Tarot by adding detailed illustrations to the Minor Arcana, making the cards 
        more accessible for intuitive reading.
      </p>
    </>
  );

  return (
    <LessonTemplate 
      title="The History of Tarot" 
      lessonNumber={1} 
      content={content} 
      onBack={onBack} 
      onComplete={onComplete} 
    />
  );
};

export default Lesson1HistoryOfTarot;
