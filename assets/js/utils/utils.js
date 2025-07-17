export function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export function padding(id) {
  return id.toString().padStart(4, '0')
}