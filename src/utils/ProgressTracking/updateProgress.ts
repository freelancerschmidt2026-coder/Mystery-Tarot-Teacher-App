export function updateProgress(newMastery: number) {
  const progress = JSON.parse(localStorage.getItem('user_progress') || '{}');
  localStorage.setItem('user_progress', JSON.stringify({ ...progress, mastery: newMastery }));
}
