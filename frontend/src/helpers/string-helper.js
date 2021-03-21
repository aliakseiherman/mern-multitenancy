export const getString = (value) => {

  let result = ''

  if (value !== null && value !== undefined) {
    result = value.toString()
  }

  return result
}