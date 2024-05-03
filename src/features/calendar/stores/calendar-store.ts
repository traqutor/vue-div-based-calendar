import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useMouseInElement } from '@vueuse/core'
import { DateTime } from 'luxon'

export interface CalendarEventItem {
  id: number
  start: DateTime
  end: DateTime
}

export interface CalendarMouseEvent {
  x: number
  y: number
  elementX: number
  elementY: number
  elementPositionX: number
  elementPositionY: number
  elementHeight: number
  elementWidth: number
  isOutside: boolean
}

export interface CalendarRow {
  id: number
  label: string
  events?: CalendarEventItem[]
}

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const calendarHeaderHeight = ref(64)
  const calendarRowHeight = ref(64)
  const calendarPositionX = ref(0)
  const calendarWidth = ref(0)
  const menuWidth = ref(250)
  const mouse = ref()

  const elCal = ref<HTMLElement>()

  const startDay = ref<DateTime>(DateTime.now().startOf('week'))
  const endDay = ref<DateTime>(DateTime.now().endOf('week'))

  const rows = ref<CalendarRow[]>([])

  const selectedCalendarEvent = ref<CalendarEventItem | null>()

  // getters
  const days = computed((): DateTime[] => {
    const diff = Math.ceil(endDay.value.diff(startDay.value, ['days']).toObject().days ?? 0)
    const d: DateTime[] = []
    for (let i = 0; i < diff; i++) {
      d.push(startDay.value.plus({ days: i }).startOf('day'))
    }

    return d
  })

  const mouseCalendar = computed((): CalendarMouseEvent => mouse.value)

  const rowWidth = computed(() => calendarWidth.value - menuWidth.value)

  const rowPositionX = computed(() => calendarPositionX.value + menuWidth.value)

  const cellWidth = computed(() => rowWidth.value / days.value.length)

  const millisDiff = computed(() =>
    days.value?.length > 0
      ? days.value[days.value.length - 1].endOf('day').diff(days.value[0]).toMillis()
      : 0
  )

  const activeRow = computed(() =>
    !mouseCalendar.value?.isOutside
      ? rows.value[Math.floor(mouseCalendar.value?.elementY / calendarRowHeight.value)]
      : null
  )

  const activeColumn = computed(() =>
    !mouseCalendar.value?.isOutside
      ? days.value[Math.floor(mouseCalendar.value?.elementX / cellWidth.value)]
      : null
  )

  const activeDateTime = computed(() => {
    return DateTime.fromMillis(calcMillisForPositionX(mouseCalendar.value?.elementX))
  })

  const calendarRowHeightPx = computed(() => `${calendarRowHeight.value}px`)
  const calendarHeaderHeightPx = computed(() => `${calendarHeaderHeight.value}px`)
  const menuWidthPx = computed(() => `${menuWidth.value}px`)
  const cellWidthPx = computed(() => `${cellWidth.value}px`)

  // actions
  function setSelectedCalendarEvent(event: CalendarEventItem | null) {
    selectedCalendarEvent.value = event
  }

  function calcMillisForPositionX(x: number) {
    const periodStartMillis = days.value.length > 0 ? days.value[0].toMillis() : 0

    return periodStartMillis + (millisDiff.value * x) / rowWidth.value
  }

  function calcDateTimeForPositionX(x: number): DateTime {
    return DateTime.fromMillis(calcMillisForPositionX(x))
  }

  function calcPositionXForDateTime(dateTime: DateTime): number {
    const millisPos = days.value.length > 0 ? dateTime.diff(days.value[0]).toMillis() : 0

    return (millisPos * rowWidth.value) / millisDiff.value
  }

  function setCalendarWidth(params: { x: number; width: number }) {
    calendarPositionX.value = params.x
    calendarWidth.value = params.width
  }

  function setCalendarElement(calendar: any) {
    elCal.value = calendar
    mouse.value = useMouseInElement(calendar)
  }

  function setCalendarRows(r: CalendarRow[]) {
    rows.value = r
  }

  function shiftNextDay() {
    startDay.value = startDay.value.plus({ day: 1 }).startOf('day')
    endDay.value = endDay.value.plus({ day: 1 }).startOf('day')
  }

  function shiftPrevDay() {
    startDay.value = startDay.value.minus({ day: 1 }).startOf('day')
    endDay.value = endDay.value.minus({ day: 1 }).startOf('day')
  }

  return {
    activeColumn,
    activeDateTime,
    activeRow,
    count,
    selectedCalendarEvent,
    days,
    rows,
    calendarWidth,
    rowWidth,
    rowPositionX,
    cellWidthPx,
    calendarRowHeightPx,
    calendarHeaderHeightPx,
    menuWidthPx,
    mouseCalendar,
    calcDateTimeForPositionX,
    calcPositionXForDateTime,
    shiftNextDay,
    shiftPrevDay,
    setCalendarRows,
    setCalendarElement,
    setCalendarWidth,
    setSelectedCalendarEvent
  }
})
