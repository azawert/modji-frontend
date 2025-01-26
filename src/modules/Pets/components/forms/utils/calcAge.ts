export const calcAge = (date: string) => {
  if (!date) return "0 лет"
  const [day, month, year] = date.split(".").map(Number)

  const isValidDate =
    day > 0 && day <= 31 && month > 0 && month <= 12 && year > 0

  if (!isValidDate) {
    return "0 лет"
  }

  const currentDate = new Date()
  const birthDate = new Date(year, month - 1, day)

  if (birthDate > currentDate) {
    return "0 лет"
  }

  let age = currentDate.getFullYear() - birthDate.getFullYear()

  const currentMonth = currentDate.getMonth()
  const birthMonth = birthDate.getMonth()
  if (
    birthMonth > currentMonth ||
    (birthMonth === currentMonth && birthDate.getDate() > currentDate.getDate())
  ) {
    age--
  }

  let yearsWord = "лет"
  if (age % 10 === 1 && age % 100 !== 11) {
    yearsWord = "год"
  } else if (
    [2, 3, 4].includes(age % 10) &&
    ![12, 13, 14].includes(age % 100)
  ) {
    yearsWord = "года"
  }

  return `${Math.abs(age)} ${yearsWord}`
}
