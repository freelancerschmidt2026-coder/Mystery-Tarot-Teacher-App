// Utility to handle unlocking NotePad index entries
export const unlockIndexEntry = (entryName) => {
  console.log(`Unlocking NotePad entry: ${entryName}`);
  // In a real app, this would update local storage or a database
  const unlockedEntries = JSON.parse(localStorage.getItem('unlockedIndexEntries') || '[]');
  if (!unlockedEntries.includes(entryName)) {
    unlockedEntries.push(entryName);
    localStorage.setItem('unlockedIndexEntries', JSON.stringify(unlockedEntries));
    // Dispatch event for components to listen to
    window.dispatchEvent(new CustomEvent('index-entry-unlocked', { detail: entryName }));
  }
};
