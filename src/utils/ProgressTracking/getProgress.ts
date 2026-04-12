export function getProgress() {
  return JSON.parse(localStorage.getItem('user_progress') || '{"mastery": 0}');
}
