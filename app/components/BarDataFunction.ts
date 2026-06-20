interface CheckInType {
  date: string;
  habitId: string;
}

const getLast7Days = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return {
      day: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date),
      date: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date),
      count: 0
    }
  }).reverse()
}

const ChartDataTranslator = (CheckInData: CheckInType[]) => {
  const last7Days = getLast7Days()
  return last7Days.map((dayObj) => ({
    day: dayObj.day,
    count: CheckInData.filter((c) => c.date === dayObj.date).length
  }))
}

export { getLast7Days, ChartDataTranslator }