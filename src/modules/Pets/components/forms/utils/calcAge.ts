export const calcAge = (date: string) => {
  if (!date) return "0 дней"
  const [day, month, year] = date.split(".").map(Number)

  const isValidDate =
    day > 0 && day <= 31 && month > 0 && month <= 12 && year > 0

  if (!isValidDate) {
    return "0 дней"
  }

  const currentDate = new Date()
  const birthDate = new Date(year, month - 1, day)

  if (birthDate > currentDate) {
    return "0 дней"
  }

  let ageYears = currentDate.getFullYear() - birthDate.getFullYear()
  let ageMonths = currentDate.getMonth() - birthDate.getMonth()
  let ageDays = currentDate.getDate() - birthDate.getDate()

  if (ageDays < 0) {
    ageMonths--
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    )
    ageDays += lastMonth.getDate()
  }

  if (ageMonths < 0) {
    ageYears--
    ageMonths += 12
  }

  if (ageYears > 0) {
    let yearsWord = "лет"
    if (ageYears % 10 === 1 && ageYears % 100 !== 11) {
      yearsWord = "год"
    } else if (
      [2, 3, 4].includes(ageYears % 10) &&
      ![12, 13, 14].includes(ageYears % 100)
    ) {
      yearsWord = "года"
    }
    return `${ageYears} ${yearsWord}`
  }

  if (ageMonths > 0) {
    let monthsWord = "месяцев"
    if (ageMonths % 10 === 1 && ageMonths % 100 !== 11) {
      monthsWord = "месяц"
    } else if (
      [2, 3, 4].includes(ageMonths % 10) &&
      ![12, 13, 14].includes(ageMonths % 100)
    ) {
      monthsWord = "месяца"
    }
    return `${ageMonths} ${monthsWord}`
  }

  let daysWord = "дней"
  if (ageDays % 10 === 1 && ageDays % 100 !== 11) {
    daysWord = "день"
  } else if (
    [2, 3, 4].includes(ageDays % 10) &&
    ![12, 13, 14].includes(ageDays % 100)
  ) {
    daysWord = "дня"
  }
  return `${ageDays} ${daysWord}`
}
