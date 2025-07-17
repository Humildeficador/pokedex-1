export const userStorage = {
  STORAGE_KEY: 'm67Cj75ZvUe_YhCwE54_d',
  set: function (value = []) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(value))
  },
  get: function () {
    try {
      const storageValue = JSON.parse(localStorage.getItem(this.STORAGE_KEY))
      if (!storageValue || !Array.isArray(storageValue)) this.set([])
      return storageValue
    } catch (error) {
      if (error instanceof SyntaxError) this.clear()
    }
  },
  clear: function () {
    localStorage.removeItem(this.STORAGE_KEY)
  }
}