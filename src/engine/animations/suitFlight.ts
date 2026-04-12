export const runSuitFlightAnimation = (
  suitDesign: {
    symbol: string | { type: string; name: string; path: string };
    count: number;
    animation: string;
  },
  visualEffectsEnabled: boolean
): (() => void) | void => {
  if (!visualEffectsEnabled) return;

  const createdElements: HTMLElement[] = [];

  for (let i = 0; i < suitDesign.count; i++) {
    const el = document.createElement('div');

    // Handle string vs object symbol
    if (typeof suitDesign.symbol === 'string') {
      if (suitDesign.symbol.trim().startsWith('<svg')) {
        el.innerHTML = suitDesign.symbol;
      } else {
        el.textContent = suitDesign.symbol;
      }
    } else if (suitDesign.symbol.type === 'svg') {
      const img = document.createElement('img');
      img.src = suitDesign.symbol.path;
      img.alt = suitDesign.symbol.name;
      img.style.width = '24px';
      img.style.height = '24px';
      img.referrerPolicy = 'no-referrer';
      el.appendChild(img);
    }
    el.style.position = 'absolute';
    el.style.fontSize = '24px';
    el.style.opacity = '0';
    el.style.transition = 'all 1.2s ease-out';
    el.style.left = '50%';
    el.style.top = '50%';

    document.body.appendChild(el);
    createdElements.push(el);

    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = `translate(${Math.random() * 200 - 100}px, ${
        Math.random() * -200 - 50
      }px)`;
    });
  }

  return () => {
    createdElements.forEach((el) => {
      el.style.transition = 'all 0.8s ease-in';
      el.style.transform = 'translate(0, 0)';
      el.style.opacity = '0';

      setTimeout(() => {
        el.remove();
      }, 900);
    });
  };
};
