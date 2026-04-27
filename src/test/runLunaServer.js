import express from "express";
import bodyParser from "body-parser";

import { ReadingEngine } from "../engine/reading/ReadingEngine.js";

const app = express();
app.use(bodyParser.json());

app.post("/luna", (req, res) => {
  const userMessage = req.body.message;

  // For now, Luna just performs a reading
  const reading = ReadingEngine.performReading({
    deck: "Rider-Waite",
    spread: "3-Card",
    mode: "CLARITY",
    questionType: "GENERAL"
  });

  const reply = `
Here is your reading:

Cards: ${reading.cards.map(c => c.name).join(", ")}
Intuition: ${reading.intuition.summary}
Emotion: ${reading.emotional.emotion}
Logic Score: ${reading.logic.finalScore}%
  `;

  res.json({ reply });
});

app.listen(3000, () => {
  console.log("Luna test server running on http://localhost:3000");
});
