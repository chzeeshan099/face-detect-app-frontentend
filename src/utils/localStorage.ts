class LocalStorageService {
  private ls: Storage | null = null; // Initialize ls with null

  constructor() {
    if (typeof window !== 'undefined') {
      this.ls = window.localStorage;
    }
  }

  // Set item in localStorage
  setItem<T>(key: string, value: T): void {
    if (this.ls !== null) {
      const serializedValue = JSON.stringify(value);
      this.ls.setItem(key, serializedValue);
    }
  }

  // Get item from localStorage
  getItem<T>(key: string): T | null {
    if (this.ls !== null) {
      const serializedValue = this.ls.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      try {
        return JSON.parse(serializedValue) as T;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // Remove item from localStorage
  removeItem(key: string): void {
    if (this.ls !== null) {
      this.ls.removeItem(key);
    }
  }

  // Clear all items from localStorage
  clear(): void {
    if (this.ls !== null) {
      this.ls.clear();
    }
  }

  // Get the key at the specified index in localStorage
  key(index: number): string | null {
    if (this.ls !== null) {
      return this.ls.key(index);
    }
    return null;
  }

  // Get the number of items stored in localStorage
  get length(): number {
    if (this.ls !== null) {
      return this.ls.length;
    }
    return 0;
  }
}

const localStorageService = new LocalStorageService();

export default localStorageService;
