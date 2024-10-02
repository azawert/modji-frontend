import dayjs from "dayjs"
import { formatDate } from "./utils"
import { DATE_FRONT_FORMAT, IDateRange } from "./types"

const randomDate = (): dayjs.Dayjs => {
  const currentDate = dayjs()
  const maxDate = currentDate.add(1, "year")
  const randomTimestamp =
    Math.floor(Math.random() * (maxDate.unix() - currentDate.unix())) +
    currentDate.unix()
  return dayjs.unix(randomTimestamp)
}

const randomDateRange = (): IDateRange => {
  const startDate = randomDate()
  const endDate = startDate.add(Math.floor(Math.random() * 30), "day")
  return { start: startDate, end: endDate }
}

describe("formatDate", () => {
  it("Корректно отображает одну дату", () => {
    const date = randomDate()
    expect(formatDate(date)).toEqual(dayjs(date).format(DATE_FRONT_FORMAT))
  })

  it("Кооректно отображает диапозон дат", () => {
    const { end, start } = randomDateRange()
    expect(formatDate({ end, start })).toEqual(
      `${dayjs(start).format(DATE_FRONT_FORMAT)} - ${dayjs(end).format(
        DATE_FRONT_FORMAT
      )}`
    )
  })

  it("Корректно отображается только с датой окончания", () => {
    const { end } = randomDateRange()
    expect(formatDate({ end, start: null })).toEqual(
      ` - ${dayjs(end).format(DATE_FRONT_FORMAT)}`
    )
  })

  it("Корректно отображается со стартовой датой", () => {
    const { start } = randomDateRange()
    expect(formatDate({ start, end: null })).toEqual(
      `${dayjs(start).format(DATE_FRONT_FORMAT)} - `
    )
  })

  it("Корректно отображается без дат", () => {
    expect(formatDate({ start: null, end: null })).toEqual(" - ")
  })
})
