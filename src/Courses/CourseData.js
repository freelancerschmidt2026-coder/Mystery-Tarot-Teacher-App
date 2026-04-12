export const COURSE_DATA = {
  1: {
    title: "Course 1: The Fool's Journey",
    overview: "Embark on the initial steps of the tarot journey, understanding the archetypal path of the Fool.",
    learningObjectives: ["Understand the Fool's archetype", "Learn the structure of the Major Arcana", "Connect with the element of Air"],
    lessons: ["The Call to Adventure", "The First Step", "The Fool's Companions"],
    requiredActivities: ["Daily Fool meditation", "First card draw journal entry"],
    optionalActivities: ["Walking meditation", "Air element ritual"],
    reflectionPrompts: ["What does 'beginning' mean to you?", "Where are you a 'Fool' in your life?"],
    notepadAssignments: ["Write a 500-word story about a new beginning", "Describe your first tarot deck"],
    backpocketKeywords: ["Innocence", "Spontaneity", "Faith", "Beginnings"],
    badgeName: "The Awakened Fool",
    worksheets: {
      1: {
        id: "c1-w1",
        title: "Initiation Worksheet: The Roots of Tarot",
        subtitle: "Reflect on the origins and archetypes of the Tarot.",
        sections: [
          {
            title: "Historical Context",
            questions: ["q1", "q2"]
          },
          {
            title: "The Major Arcana",
            questions: ["q3", "q4"]
          },
          {
            title: "Personal Reflection",
            questions: ["q5"]
          }
        ],
        questions: [
          {
            id: "q1",
            type: "multiple-choice",
            question: "In which century did Tarot cards first appear in Italy?",
            options: ["13th Century", "14th Century", "15th Century", "16th Century"],
            correctAnswer: "15th Century",
            explanation: "Tarot first appeared in mid-15th century Italy as a card game known as tarocchini or trionfi."
          },
          {
            id: "q2",
            type: "multiple-choice",
            question: "Which deck is considered the oldest surviving Tarot deck?",
            options: ["Tarot of Marseilles", "Visconti-Sforza", "Rider-Waite-Smith", "Thoth Tarot"],
            correctAnswer: "Visconti-Sforza",
            explanation: "The Visconti-Sforza decks are the oldest surviving Tarot cards, commissioned by wealthy families in the mid-15th century."
          },
          {
            id: "q3",
            type: "multiple-choice",
            question: "Which Major Arcana card represents the number 0?",
            options: ["The Magician", "The Fool", "The World", "The High Priestess"],
            correctAnswer: "The Fool",
            explanation: "The Fool is the first card of the Major Arcana, representing number 0 and new beginnings."
          },
          {
            id: "q4",
            type: "text",
            question: "What is the name of the protagonist's journey through the Major Arcana?",
            correctAnswer: "The Fool's Journey",
            explanation: "The Fool's Journey is the metaphor for the human experience represented by the 22 Major Arcana cards."
          },
          {
            id: "q5",
            type: "reflection",
            question: "Reflect on the concept of 'The Fool's Leap.' How does this archetypal energy manifest in your current life path?",
            explanation: "Reflections are personal, but require a thoughtful response of at least 10 characters."
          }
        ]
      }
    }
  },
  2: {
    title: "Course 2: The Magician's Will",
    overview: "Master the tools of manifestation and the power of focused intention.",
    learningObjectives: ["Harness the four elements", "Understand the power of focus", "Manifestation techniques"],
    lessons: ["The Four Tools", "As Above, So Below", "The Spark of Creation"],
    requiredActivities: ["Altar setup", "Intention setting ritual"],
    optionalActivities: ["Candle magic", "Elemental meditation"],
    reflectionPrompts: ["What tools do you already possess?", "How do you direct your will?"],
    notepadAssignments: ["List your personal 'tools'", "Describe a successful manifestation"],
    backpocketKeywords: ["Action", "Power", "Resourcefulness", "Manifestation"],
    badgeName: "The Master Manifestor"
  },
  3: {
    title: "Course 3: The Priestess's Silence",
    overview: "Dive into the depths of intuition and the mysteries of the subconscious.",
    learningObjectives: ["Develop intuitive listening", "Understand the veil", "Moon cycles and tarot"],
    lessons: ["The Pillars of Duality", "The Scroll of Knowledge", "The Silent Voice"],
    requiredActivities: ["Dream journaling", "Intuition exercises"],
    optionalActivities: ["Moonlight meditation", "Scrying practice"],
    reflectionPrompts: ["What does silence tell you?", "How do you trust your gut?"],
    notepadAssignments: ["Record a significant dream", "Write a letter to your subconscious"],
    backpocketKeywords: ["Intuition", "Mystery", "Subconscious", "Silence"],
    badgeName: "The Intuitive Seer"
  },
  4: {
    title: "Course 4: The Empress's Abundance",
    overview: "Connect with the nurturing power of nature and the creative force of life.",
    learningObjectives: ["Earth element connection", "Nurturing creativity", "Abundance mindset"],
    lessons: ["The Garden of the Soul", "The Mother Archetype", "Sensory Awakening"],
    requiredActivities: ["Nature walk", "Creative project start"],
    optionalActivities: ["Gardening", "Cooking with intention"],
    reflectionPrompts: ["What are you currently birthing?", "How do you nurture yourself?"],
    notepadAssignments: ["Describe a place of natural beauty", "Plan a creative ritual"],
    backpocketKeywords: ["Fertility", "Nature", "Abundance", "Nurturing"],
    badgeName: "The Creative Nurturer"
  },
  5: {
    title: "Course 5: The Emperor's Structure",
    overview: "Establish order, authority, and the foundations of your personal empire.",
    learningObjectives: ["Leadership and authority", "Building foundations", "The power of structure"],
    lessons: ["The Throne of Reason", "The Shield of Protection", "The Law of the Land"],
    requiredActivities: ["Daily schedule creation", "Boundary setting exercise"],
    optionalActivities: ["Strategic planning", "Physical discipline"],
    reflectionPrompts: ["What structures support you?", "How do you lead your own life?"],
    notepadAssignments: ["Define your personal code of ethics", "Map out your long-term goals"],
    backpocketKeywords: ["Authority", "Structure", "Control", "Foundation"],
    badgeName: "The Sovereign Leader"
  },
  6: {
    title: "Course 6: The Hierophant's Tradition",
    overview: "Explore the wisdom of tradition, education, and spiritual guidance.",
    learningObjectives: ["Understanding lineage", "The role of the teacher", "Sacred rituals"],
    lessons: ["The Keys of Wisdom", "The Sacred Council", "The Bridge of Belief"],
    requiredActivities: ["Study of a tarot lineage", "Ritual performance"],
    optionalActivities: ["Mentorship session", "Historical research"],
    reflectionPrompts: ["What traditions do you value?", "Who are your teachers?"],
    notepadAssignments: ["Write a summary of a tarot tradition", "Reflect on a spiritual lesson"],
    backpocketKeywords: ["Tradition", "Education", "Belief", "Conformity"],
    badgeName: "The Wise Student"
  },
  7: {
    title: "Course 7: The Lovers' Choice",
    overview: "Navigate the complexities of relationships, values, and the power of choice.",
    learningObjectives: ["Alignment of values", "The alchemy of connection", "Making soulful choices"],
    lessons: ["The Union of Opposites", "The Angel of Guidance", "The Path of the Heart"],
    requiredActivities: ["Values assessment", "Relationship reflection"],
    optionalActivities: ["Heart-opening yoga", "Communication exercises"],
    reflectionPrompts: ["What do you value most in others?", "How do you make difficult choices?"],
    notepadAssignments: ["List your core values", "Describe a moment of true connection"],
    backpocketKeywords: ["Love", "Harmony", "Relationships", "Choices"],
    badgeName: "The Harmonious Soul"
  },
  8: {
    title: "Course 8: The Chariot's Triumph",
    overview: "Harness your willpower to overcome obstacles and achieve victory.",
    learningObjectives: ["Determination and drive", "Balancing opposing forces", "Victory through will"],
    lessons: ["The Reins of Control", "The Armor of Will", "The Path of the Victor"],
    requiredActivities: ["Goal achievement plan", "Obstacle identification"],
    optionalActivities: ["Physical challenge", "Visualization of success"],
    reflectionPrompts: ["What drives you forward?", "How do you handle conflict?"],
    notepadAssignments: ["Map out a path to a specific goal", "Reflect on a past victory"],
    backpocketKeywords: ["Control", "Willpower", "Victory", "Determination"],
    badgeName: "The Victorious Driver"
  },
  9: {
    title: "Course 9: Strength's Compassion",
    overview: "Discover the inner power of courage, patience, and gentle control.",
    learningObjectives: ["Inner strength vs. brute force", "Patience and endurance", "Taming the inner beast"],
    lessons: ["The Lion's Heart", "The Gentle Touch", "The Power of Endurance"],
    requiredActivities: ["Patience practice", "Self-compassion exercise"],
    optionalActivities: ["Animal connection", "Meditation on courage"],
    reflectionPrompts: ["What is your greatest inner strength?", "How do you show yourself compassion?"],
    notepadAssignments: ["Write about a time you showed courage", "Describe your 'inner lion'"],
    backpocketKeywords: ["Strength", "Courage", "Patience", "Compassion"],
    badgeName: "The Courageous Heart"
  },
  10: {
    title: "Course 10: The Hermit's Light",
    overview: "Seek wisdom through solitude, introspection, and your inner light.",
    learningObjectives: ["The value of solitude", "Finding your inner guide", "The path of introspection"],
    lessons: ["The Lantern of Truth", "The Staff of Support", "The Mountain of Solitude"],
    requiredActivities: ["Period of silence", "Introspective journaling"],
    optionalActivities: ["Solo retreat", "Night sky meditation"],
    reflectionPrompts: ["What do you find in the silence?", "How do you light your own path?"],
    notepadAssignments: ["Write a letter to your future self", "Reflect on a period of solitude"],
    backpocketKeywords: ["Solitude", "Introspection", "Guidance", "Wisdom"],
    badgeName: "The Inner Light Bearer"
  }
};
