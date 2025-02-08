export const getDayDifference = (date1: string, date2: string) => {
  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split(".")
    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  const firstDate = parseDate(date1)
  const secondDate = parseDate(date2)

  const timeDifference = Math.abs(Number(secondDate) - Number(firstDate))

  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return dayDifference
}
