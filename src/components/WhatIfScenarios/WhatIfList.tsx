import React from 'react';
import WhatIfScenario from './WhatIfScenario';

export default function WhatIfList() {
  const scenarios = [
    { question: 'What if the Fool met the Magician?', scenario: 'How would their energies combine in a reading about a new career path?' },
    { question: 'What if the Empress was reversed?', scenario: 'How does it change the tone of a reading about creativity and abundance?' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {scenarios.map((s, i) => <WhatIfScenario key={i} {...s} />)}
    </div>
  );
}
