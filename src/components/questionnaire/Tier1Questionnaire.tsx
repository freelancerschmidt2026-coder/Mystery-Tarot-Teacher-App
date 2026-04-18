// src/components/questionnaire/Tier1Questionnaire.tsx

import React, { useState } from "react";

type Props = {
  memberId: string;
  onSubmit: (answers: {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    rating: number;
  }) => Promise<void>;
  onClose: () => void;
};

export const Tier1Questionnaire: React.FC<Props> = ({
  memberId,
  onSubmit,
  onClose
}) => {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    rating: 5
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit(answers);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="tier1-questionnaire-overlay">
      <div className="tier1-questionnaire-modal">
        <h2>Tier 1 Feedback</h2>
        <p>
          Your insights help Luna evolve and help the GateKeeper refine the
          Mystery System.
        </p>

        {!submitted ? (
          <>
            <div className="question-block">
              <label>1. Which lesson impacted you the most?</label>
              <textarea
                value={answers.q1}
                onChange={(e) => handleChange("q1", e.target.value)}
              />
            </div>

            <div className="question-block">
              <label>2. What felt the most surprising or eye‑opening?</label>
              <textarea
                value={answers.q2}
                onChange={(e) => handleChange("q2", e.target.value)}
              />
            </div>

            <div className="question-block">
              <label>3. What part of Tier 1 felt the most challenging?</label>
              <textarea
                value={answers.q3}
                onChange={(e) => handleChange("q3", e.target.value)}
              />
            </div>

            <div className="question-block">
              <label>4. What would you love to see expanded in Tier 2?</label>
              <textarea
                value={answers.q4}
                onChange={(e) => handleChange("q4", e.target.value)}
              />
            </div>

            <div className="question-block">
              <label>5. What did you enjoy the most about Tier 1?</label>
              <textarea
                value={answers.q5}
                onChange={(e) => handleChange("q5", e.target.value)}
              />
            </div>

            <div className="rating-block">
              <label>Overall Tier 1 Experience (1–10)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={answers.rating}
                onChange={(e) =>
                  handleChange("rating", Number(e.target.value))
                }
              />
            </div>

            <footer className="questionnaire-footer">
              <button onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </footer>
          </>
        ) : (
          <div className="thank-you-block">
            <h3>Thank you!</h3>
            <p>Your feedback has been saved to the GateKeeper CRM.</p>
            <button onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};
