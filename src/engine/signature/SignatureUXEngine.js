// SignatureUXEngine.js
// Pure logic for the animated signature creation ritual (UI-agnostic)

export const SignatureUXEngine = {
  state: {
    firstName: "",
    lastName: "",
    fullName: "",
    fontStyle: "default",
    fontColor: "#ffffff",
    questionMarks: [],
    pixieDustParticles: [],
    signatureFormed: false,
    signatureSaved: false,
    animationStage: "idle" // idle | forming_signature | signature_glow | shatter | complete
  },

  // Initialize page with question marks
  initPage() {
    this.state.questionMarks = this.generateQuestionMarks(40);
    this.state.pixieDustParticles = [];
    this.state.animationStage = "idle";
    this.state.signatureFormed = false;
    this.state.signatureSaved = false;
  },

  generateQuestionMarks(count) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: `qm_${i}`,
        x: Math.random(),   // 0–1 normalized, UI decides actual position
        y: Math.random(),
        color: this.randomColor(),
        exploded: false
      });
    }
    return arr;
  },

  // When a question mark is clicked → explode into pixie dust
  explodeQuestionMark(id) {
    const qm = this.state.questionMarks.find(q => q.id === id);
    if (!qm || qm.exploded) return;

    qm.exploded = true;

    for (let i = 0; i < 20; i++) {
      this.state.pixieDustParticles.push({
        id: `px_${id}_${i}`,
        color: qm.color,
        x: qm.x,
        y: qm.y,
        floatSpeed: Math.random() * 0.01 + 0.005
      });
    }
  },

  // Member types their name
  updateName(first, last) {
    this.state.firstName = first;
    this.state.lastName = last;
    this.state.fullName = `${first} ${last}`.trim();

    if (first.length > 0 && last.length > 0) {
      this.triggerSignatureFormation();
    }
  },

  // Trigger signature formation animation
  triggerSignatureFormation() {
    if (this.state.signatureFormed) return;

    this.state.animationStage = "forming_signature";

    this.state.pixieDustParticles = this.state.pixieDustParticles.map(p => ({
      ...p,
      targetX: 0.05,
      targetY: 0.05,
      speed: Math.random() * 0.02 + 0.01
    }));

    setTimeout(() => {
      this.state.signatureFormed = true;
      this.state.animationStage = "signature_glow";
    }, 2000);
  },

  // Change font style
  updateFontStyle(style) {
    this.state.fontStyle = style;
  },

  // Change font color
  updateFontColor(color) {
    this.state.fontColor = color;
    this.state.pixieDustParticles = this.state.pixieDustParticles.map(p => ({
      ...p,
      color
    }));
  },

  // Save signature → trigger shatter animation
  saveSignature() {
    this.state.animationStage = "shatter";

    this.state.pixieDustParticles = this.state.pixieDustParticles.map(p => ({
      ...p,
      shatter: true,
      speed: Math.random() * 0.05 + 0.02
    }));

    setTimeout(() => {
      this.state.signatureSaved = true;
      this.state.animationStage = "complete";
    }, 1500);

    return {
      fullName: this.state.fullName,
      fontStyle: this.state.fontStyle,
      fontColor: this.state.fontColor,
      savedAt: new Date().toISOString()
    };
  },

  randomColor() {
    const colors = ["#ff00ff", "#00ffff", "#ffcc00", "#ff6699", "#99ff66"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
};
