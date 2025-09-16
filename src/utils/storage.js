export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromStorage = (key, fallback = null) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export function clearStorage() {
  localStorage.clear();
};
