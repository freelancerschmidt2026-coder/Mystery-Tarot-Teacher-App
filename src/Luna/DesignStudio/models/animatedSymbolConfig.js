export const animatedSymbols = [
  {
    id: "mystic_eye_pulse",
    label: "Mystic Eye (Pulse)",
    category: "Mystic Eyes & Geometry",
    type: "symbol",
    src: "/assets/symbols/mystic/eye_circle.svg",
    defaultSize: { width: 120, height: 120 },
    defaultPosition: { x: 0.5, y: 0.3 }, // relative (0–1)
    animation: {
      type: "pulse",
      duration: 2000,
      easing: "ease-in-out",
      intensity: 1.2
    }
  },
  {
    id: "moon_glow",
    label: "Moon (Glow)",
    category: "Celestial",
    type: "symbol",
    src: "/assets/symbols/celestial/moon.svg",
    defaultSize: { width: 100, height: 100 },
    defaultPosition: { x: 0.2, y: 0.2 },
    animation: {
      type: "glow",
      duration: 3000,
      easing: "ease-in-out",
      intensity: 0.8
    }
  },
  {
    id: "sun_radiate",
    label: "Sun (Radiate)",
    category: "Celestial",
    type: "symbol",
    src: "/assets/symbols/celestial/sun.svg",
    defaultSize: { width: 110, height: 110 },
    defaultPosition: { x: 0.8, y: 0.2 },
    animation: {
      type: "radiate",
      duration: 2500,
      easing: "linear",
      intensity: 1.0
    }
  }
];
