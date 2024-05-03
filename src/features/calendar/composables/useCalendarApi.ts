import type { CalendarRow } from '@/features/calendar/stores/calendar-store'
import { DateTime } from 'luxon'
import { useCounterStore } from '@/features/calendar/stores/calendar-store'

export const useCalendarApi = () => {
  const initData = () => {

    const store = useCounterStore();

    const rows: CalendarRow[] = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10
    ].map((d) => {
      return {
        id: d,
        label: `Item no ${d}`,
        events: [
          {
            id: 1 + d,
            start: DateTime.now().startOf('day').plus({ hours: d }),
            end: DateTime.now()
              .startOf('day')
              .plus({ hours: 24 * d })
          },
          {
            id: 5 + d,
            start: DateTime.now()
              .startOf('day')
              .plus({ hours: 24 * d }),
            end: DateTime.now()
              .startOf('day')
              .plus({ hours: 48 * d })
          }
        ]
      }
    })

    store.setCalendarRows(rows)
  }

  return {
    initData
  }
}
