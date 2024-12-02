export const saveToStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const loadFromStorage = <T>(key: string): T | null => {
  const rawData = localStorage.getItem(key);
  return rawData ? JSON.parse(rawData) : null;
};
