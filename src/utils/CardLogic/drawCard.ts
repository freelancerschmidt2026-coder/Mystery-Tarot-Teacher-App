export function drawCard<T>(deck: T[]): T {
  return deck[Math.floor(Math.random() * deck.length)];
}
