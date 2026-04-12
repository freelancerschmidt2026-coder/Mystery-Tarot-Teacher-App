import React, { useState, useEffect, useRef } from "react";
import "./FloatingMysteryMarks.css";

const TOTAL_MARKS = 76;
const GROUP_SIZE = 15;

function createMarks() {
  const marks = [];

  for (let i = 0; i < TOTAL_MARKS; i++) {
    const isPrize = i === TOTAL_MARKS - 1; // last one = prize
    let behaviorType = "orbit";

    if (!isPrize) {
      if (i < GROUP_SIZE) behaviorType = "orbit"; // 0–14
      else if (i < GROUP_SIZE * 2) behaviorType = "starburst"; // 15–29
      else if (i < GROUP_SIZE * 3) behaviorType = "mirror"; // 30–44
      else if (i < GROUP_SIZE * 4) behaviorType = "trail"; // 45–59
      else behaviorType = "ripple"; // 60–74
    } else {
      behaviorType = "prize";
    }

    const depth = 0.3 + Math.random() * 0.2; // 0.3–0.5
    const floatDuration = 18 + Math.random() * 10; // seconds
    const spinDuration = 20 + Math.random() * 15;
    
    // Rainbow properties
    const rainbowAngle = Math.floor(Math.random() * 360);
    const rainbowDuration = 4 + Math.random() * 6;
    const rainbowDirection = Math.random() < 0.5 ? "normal" : "reverse";

    marks.push({
      id: i,
      isPrize,
      behaviorType,
      top: Math.random() * 100,
      left: Math.random() * 100,
      depth,
      floatDuration,
      spinDuration,
      rainbowAngle,
      rainbowDuration,
      rainbowDirection,
      ref: React.createRef()
    });
  }

  return marks;
}

export default function FloatingMysteryMarks({ onPrizeWon, onGoldenWon }) {
  const [marks, setMarks] = useState([]);
  const [goldenMark, setGoldenMark] = useState(null);

  useEffect(() => {
    setMarks(createMarks());
    
    // 1% chance for Golden Mark per session
    if (Math.random() < 0.01) {
      setGoldenMark({
        id: 'golden',
        top: Math.random() * 80 + 10,
        left: Math.random() * 80 + 10,
        depth: 0.8,
        floatDuration: 25 + Math.random() * 10,
        ref: React.createRef()
      });
    }
  }, []);

  function handleNormalClick(mark) {
    const el = mark.ref.current;
    if (!el) return;

    // Clear previous active classes
    el.classList.remove(
      "qm-orbit-active",
      "qm-starburst-active",
      "qm-mirror-active",
      "qm-trail-active",
      "qm-ripple-active"
    );

    // Add behavior-specific class
    if (mark.behaviorType === "orbit") {
      el.classList.add("qm-orbit-active");
    } else if (mark.behaviorType === "starburst") {
      el.classList.add("qm-starburst-active");
    } else if (mark.behaviorType === "mirror") {
      el.classList.add("qm-mirror-active");
    } else if (mark.behaviorType === "trail") {
      el.classList.add("qm-trail-active");
    } else if (mark.behaviorType === "ripple") {
      el.classList.add("qm-ripple-active");
    }

    // Remove active class after animation
    setTimeout(() => {
      el.classList.remove(
        "qm-orbit-active",
        "qm-starburst-active",
        "qm-mirror-active",
        "qm-trail-active",
        "qm-ripple-active"
      );
    }, 1200);
  }

  function handlePrizeClick(mark) {
    const el = mark.ref.current;
    if (!el) return;

    // 1. Spin rapidly + 2. Scale to 300-400%
    el.classList.add("qm-prize-spin-scale");

    // 3. Hold briefly (0.2s hold is part of the animation timing)
    setTimeout(() => {
      // 4. Burst into shards, sparks, fragments, etc.
      el.classList.add("qm-prize-burst");

      setTimeout(() => {
        // Hide the mark after burst
        el.style.opacity = 0;

        // 5. THEN open PrizeRevealPopup
        const selectedPrize = {
          reward: "Free Mystery Course Lesson",
          description:
            "Luna opens a private Mystery Teacher Room with a lesson not found anywhere else."
        };

        if (typeof onPrizeWon === "function") {
          onPrizeWon(selectedPrize);
        }
      }, 600);
    }, 800); // Wait for spin/scale/hold
  }

  function handleGoldenClick() {
    if (!goldenMark || !goldenMark.ref.current) return;
    const el = goldenMark.ref.current;

    // Expand + Emit dust + Leave afterimage
    el.classList.add("qm-golden-active");

    setTimeout(() => {
      setGoldenMark(null); // Fade out/Remove
      
      if (typeof onGoldenWon === "function") {
        onGoldenWon({
          reward: "Golden Bonus Reward",
          description: "You have discovered a rare fragment of the digital sun. A special bonus has been granted."
        });
      }
    }, 1000);
  }

  function handleClick(mark) {
    if (mark.isPrize) {
      handlePrizeClick(mark);
    } else {
      handleNormalClick(mark);
    }
  }

  return (
    <div className="floating-marks-layer">
      {marks.map((mark) => (
        <div
          key={mark.id}
          ref={mark.ref}
          className={`qm-base qm-${mark.behaviorType} ${
            mark.isPrize ? "qm-prize" : ""
          }`}
          style={{
            top: `${mark.top}%`,
            left: `${mark.left}%`,
            "--float-duration": `${mark.floatDuration}s`,
            "--depth": mark.depth
          }}
          onClick={() => handleClick(mark)}
        >
          <span 
            className="qm-curve" 
            style={!mark.isPrize ? {
              background: `linear-gradient(${mark.rainbowAngle}deg, #FF4FFB, #6EC1FF, #E5E4E2, white, #6EC1FF, #FF4FFB)`,
              backgroundSize: '400% 400%',
              animation: `rainbowFlow ${mark.rainbowDuration}s ease-in-out infinite ${mark.rainbowDirection}`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block'
            } : { color: '#FF4FFB' }}
          >
            ?
          </span>
          <span className="qm-dot">.</span>
        </div>
      ))}

      {goldenMark && (
        <div
          ref={goldenMark.ref}
          className="qm-base qm-golden"
          style={{
            top: `${goldenMark.top}%`,
            left: `${goldenMark.left}%`,
            "--float-duration": `${goldenMark.floatDuration}s`,
            "--depth": goldenMark.depth
          }}
          onClick={handleGoldenClick}
        >
          <span className="qm-curve">?</span>
          <span className="qm-dot">.</span>
          <div className="golden-shimmer"></div>
        </div>
      )}
    </div>
  );
}
