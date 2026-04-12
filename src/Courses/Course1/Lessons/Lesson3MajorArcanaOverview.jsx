import React from 'react';
import LessonTemplate from '../../LessonTemplate';

const Lesson3MajorArcanaOverview = ({ onBack, onComplete }) => {
  const content = (
    <>
      <p>
        The Major Arcana are the 22 cards of the Tarot that represent 
        significant life events, archetypal figures, and universal truths. 
        They are the core of the Tarot's wisdom.
      </p>
      
      <h2>The Archetypal Journey</h2>
      <p>
        Each Major Arcana card represents a stage in the human journey, 
        from birth to spiritual enlightenment. They are the "big" cards 
        that speak to the soul's evolution.
      </p>
      
      <blockquote>
        "The Major Arcana are the mirrors of our inner world, reflecting 
        our deepest desires, fears, and aspirations."
      </blockquote>

      <h2>The Major Arcana Cards</h2>
      <ul>
        <li><b>0 The Fool:</b> New beginnings, innocence, and the leap of faith.</li>
        <li><b>I The Magician:</b> Manifestation, power, and the will to create.</li>
        <li><b>II The High Priestess:</b> Intuition, mystery, and the subconscious.</li>
        <li><b>III The Empress:</b> Abundance, creativity, and the nurturing mother.</li>
        <li><b>IV The Emperor:</b> Structure, authority, and the father figure.</li>
        <li><b>V The Hierophant:</b> Tradition, education, and spiritual guidance.</li>
        <li><b>VI The Lovers:</b> Choice, harmony, and the union of opposites.</li>
        <li><b>VII The Chariot:</b> Determination, victory, and the will to succeed.</li>
        <li><b>VIII Strength:</b> Courage, compassion, and the inner strength.</li>
        <li><b>IX The Hermit:</b> Solitude, introspection, and the search for truth.</li>
        <li><b>X Wheel of Fortune:</b> Change, cycles, and the hand of fate.</li>
        <li><b>XI Justice:</b> Balance, fairness, and the consequences of actions.</li>
        <li><b>XII The Hanged Man:</b> Surrender, perspective, and the pause before action.</li>
        <li><b>XIII Death:</b> Transformation, ending, and the rebirth of the soul.</li>
        <li><b>XIV Temperance:</b> Balance, moderation, and the alchemy of the spirit.</li>
        <li><b>XV The Devil:</b> Addiction, materialism, and the shadow self.</li>
        <li><b>XVI The Tower:</b> Sudden change, upheaval, and the breaking of structures.</li>
        <li><b>XVII The Star:</b> Hope, inspiration, and the light of the soul.</li>
        <li><b>XVIII The Moon:</b> Illusion, dreams, and the hidden depths of the mind.</li>
        <li><b>XIX The Sun:</b> Joy, success, and the radiance of the spirit.</li>
        <li><b>XX Judgement:</b> Awakening, rebirth, and the call to higher purpose.</li>
        <li><b>XXI The World:</b> Completion, wholeness, and the fulfillment of the journey.</li>
      </ul>
    </>
  );

  return (
    <LessonTemplate 
      title="The Major Arcana Overview" 
      lessonNumber={3} 
      content={content} 
      onBack={onBack} 
      onComplete={onComplete} 
    />
  );
};

export default Lesson3MajorArcanaOverview;
