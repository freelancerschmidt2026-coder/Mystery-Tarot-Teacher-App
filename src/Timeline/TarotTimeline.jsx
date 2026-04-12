import React, { useState } from "react";
import "./tarotTimeline.css";

const TIMELINE_EVENTS = [
  {
    id: "major-origins",
    era: "Origins of the Major Arcana",
    period: "Mythic Era",
    type: "history",
    description:
      "The archetypal journey of the Fool through the 22 Major Arcana, mapping the soul’s evolution.",
  },
  {
    id: "minor-houses",
    era: "The Four Houses of the Minor Arcana",
    period: "Elemental Era",
    type: "history",
    description:
      "Wands, Cups, Swords, and Pentacles emerge as elemental lenses for daily life and practice.",
  },
  {
    id: "personal-begin",
    era: "Your First Reading",
    period: "Personal Era",
    type: "personal",
    description:
      "The moment you first laid cards with intention. Luna marks this as the opening of your path.",
  },
  {
    id: "course-initiation",
    era: "Course Initiation",
    period: "Learning Era",
    type: "personal",
    description:
      "Your formal entry into structured study within the Mystery Tarot Teacher universe.",
  },
  {
    id: "shadow-breakthrough",
    era: "First Shadow Breakthrough",
    period: "Shadow Era",
    type: "personal",
    description:
      "A key moment from Luna’s Shadow Work Chamber where a pattern was named and released.",
  },
];

const TarotTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reflection, setReflection] = useState("");

  const handleSaveReflection = () => {
    if (!selectedEvent) return;

    const entry = {
      type: "Tarot Timeline",
      eventId: selectedEvent.id,
      era: selectedEvent.era,
      period: selectedEvent.period,
      description: selectedEvent.description,
      reflection,
      timestamp: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("tarotTimelineLog") || "[]");
    existing.push(entry);
    localStorage.setItem("tarotTimelineLog", JSON.stringify(existing));

    // Mirror into NotePad category
    const notePadEntries = JSON.parse(localStorage.getItem("notePadEntries") || "[]");
    notePadEntries.push({
      category: "Tarot Timeline",
      title: selectedEvent.era,
      content: reflection,
      meta: {
        period: selectedEvent.period,
        type: selectedEvent.type,
      },
      timestamp: entry.timestamp,
    });
    localStorage.setItem("notePadEntries", JSON.stringify(notePadEntries));

    setReflection("");
    alert("Reflection saved to Tarot Timeline and NotePad.");
  };

  return (
    <div className="timeline-root">
      <h1 className="timeline-title">Mystery Tarot Timeline</h1>
      <p className="timeline-subtitle">
        Scroll through the eras. Click a node to see its story. Add your reflection to weave your
        journey into the tapestry.
      </p>

      <div className="timeline-track">
        {TIMELINE_EVENTS.map((event, index) => (
          <div
            key={event.id}
            className={`timeline-node ${
              selectedEvent && selectedEvent.id === event.id ? "active" : ""
            }`}
            onClick={() => setSelectedEvent(event)}
          >
            <div className="timeline-dot" />
            <div className="timeline-label">
              <div className="timeline-era">{event.era}</div>
              <div className="timeline-period">{event.period}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="timeline-detail-panel">
          <h2 className="timeline-detail-era">{selectedEvent.era}</h2>
          <p className="timeline-detail-period">{selectedEvent.period}</p>
          <p className="timeline-detail-description">{selectedEvent.description}</p>

          <div className="timeline-reflection-block">
            <label>Your Reflection</label>
            <textarea
              className="timeline-textarea"
              placeholder="What does this era or moment mean in your journey?"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            />
            <button className="timeline-save" onClick={handleSaveReflection}>
              Save Reflection to NotePad
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarotTimeline;
