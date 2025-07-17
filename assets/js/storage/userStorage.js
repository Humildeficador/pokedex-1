export const userStorage = {
  STORAGE_KEY: 'm67Cj75ZvUe_YhCwE54_d',
  set: function (value = []) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(value))
  },
  get: function () {
    const storageValue = localStorage.getItem(this.STORAGE_KEY)
    if (!storageValue) this.set([])
    return JSON.parse(storageValue)
  }
}