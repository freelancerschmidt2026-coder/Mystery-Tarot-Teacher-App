export function unlockAchievement(id: string) {
  const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
  if (!achievements.includes(id)) {
    localStorage.setItem('achievements', JSON.stringify([...achievements, id]));
  }
}
