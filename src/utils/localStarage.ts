export function setLS<T>(key: string, value: T): void {
  const data = typeof value === 'string' ? value : JSON.stringify(value);
  localStorage.setItem(key, data);
}

export function getLS<T>(key: string): T | null {
  const storedValue = localStorage.getItem(key);

  if (storedValue === null) {
    return null;
  }

  if (
    (storedValue.startsWith('{') && storedValue.endsWith('}')) ||
    (storedValue.startsWith('[') && storedValue.endsWith(']'))
  ) {
    try {
      return JSON.parse(storedValue) as T;
    } catch (error) {
      console.error('JSON parse error:', error);
      return null;
    }
  }

  return storedValue as T;
}

export function clearLS(key: string): void {
  localStorage.removeItem(key);
}
export function clearAllLS(): void {
  localStorage.clear();
}
