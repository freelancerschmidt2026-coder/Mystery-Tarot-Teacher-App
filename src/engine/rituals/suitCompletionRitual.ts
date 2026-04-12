export const runSuitCompletionRitual = (
  masteryPercentage: number,
  visualEffectsEnabled: boolean,
  onCertificateReady: (certificateData: any) => void
): void => {
  if (!visualEffectsEnabled) {
    onCertificateReady({
      masteryPercentage,
      timestamp: Date.now(),
      lunaSignature: "Luna ✦",
      gatekeeperSignature: "The Gatekeeper",
    });
    return;
  }

  const center = document.createElement('div');
  center.style.position = 'fixed';
  center.style.left = '50%';
  center.style.top = '50%';
  center.style.transform = 'translate(-50%, -50%)';
  center.style.fontSize = '32px';
  center.style.opacity = '0';
  center.style.transition = 'opacity 1s ease-out';
  center.textContent = `Mastery: ${masteryPercentage}%`;
  document.body.appendChild(center);

  requestAnimationFrame(() => {
    center.style.opacity = '1';
  });

  const luna = document.createElement('div');
  luna.textContent = '🌙';
  luna.style.position = 'fixed';
  luna.style.left = '50%';
  luna.style.top = '120%';
  luna.style.transform = 'translateX(-50%)';
  luna.style.fontSize = '48px';
  luna.style.transition = 'top 1.5s ease-out';
  document.body.appendChild(luna);

  setTimeout(() => {
    luna.style.top = '60%';
  }, 300);

  setTimeout(() => {
    onCertificateReady({
      masteryPercentage,
      timestamp: Date.now(),
      lunaSignature: "Luna ✦",
      gatekeeperSignature: "The Gatekeeper",
    });

    setTimeout(() => {
      center.remove();
      luna.remove();
    }, 1500);
  }, 2000);
};
