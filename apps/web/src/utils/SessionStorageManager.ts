export class SessionStorageManager {
  #key: string

  constructor(key: string) {
    this.#key = key
  }

  setValue(value: string) {
    try {
      const valueToStore = JSON.stringify(value)
      window.sessionStorage.setItem(this.#key, valueToStore)
    } catch (error) {
      console.error(`Error saving ${this.#key} to sessionStorage`, error)
    }
  }

  getValue() {
    try {
      const item = window.sessionStorage.getItem(this.#key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error reading ${this.#key} from sessionStorage`, error)
      return null
    }
  }

  removeValue() {
    try {
      window.sessionStorage.removeItem(this.#key)
    } catch (error) {
      console.error(`Error removing ${this.#key} from sessionStorage`, error)
    }
  }
}
