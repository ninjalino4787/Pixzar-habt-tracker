interface CheckInType {
  createdAt: string;
  habitId: string;
}

const getLast7Days = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return {
      day: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date),
      date: date.toDateString(),
      count: 0
    }
  }).reverse()
}

const ChartDataTranslator = (CheckInData: CheckInType[]) => {
  const last7Days = getLast7Days()
  return last7Days.map((dayObj) => ({
    day: dayObj.day,
    count: CheckInData.filter((c) => 
      new Date(c.createdAt).toDateString() === dayObj.date
    ).length
  }))
}

export { getLast7Days, ChartDataTranslator }