import { DocShotData } from "@/types";
import { flatten, unionBy } from "lodash";
import { DateTime } from "luxon";

type DateObject = {
    year: number
    month: number
    day: number
}

export const getShotsViewsAsDateObjects = (shots: DocShotData[]): DateObject[] => {
    const shotsViews = flatten(shots.map(shot => shot.views)).map(view => {
        const asDateObj = DateTime.fromSeconds(view.createdAt)
        return { year: asDateObj.year, month: asDateObj.month, day: asDateObj.day }
    })
    return shotsViews
}
export const getGroupDateObjects = (views: DateObject[]) => {
    const currentMonth = DateTime.now().toObject()
    const prevMonth = DateTime.now().minus({ month: 1 }).toObject()
    const currentMonthViews = views.filter(view => view.month === currentMonth.month && view.year === currentMonth.year).length
    const prevMonthViews = views.filter(view => view.month === prevMonth.month && view.year === prevMonth.year).length
    const diffPercents = currentMonthViews - prevMonthViews
    return { prev: prevMonthViews, current: currentMonthViews, percents: diffPercents }
}