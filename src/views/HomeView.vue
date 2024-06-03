<template>
  <main>
    <TheHeader />
    <div class="main-wrapper">
      <div class="calendar-wrapper">
        <TheCalendar />
      </div>
      <div class="pre-wrap">
        <pre>E: {{ selected }}</pre>
        <pre>R: {{ selectedCalendarEvent }}</pre>
        <pre>{{ mouse }}</pre>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TheCalendar from '@/features/calendar/TheCalendar.vue'
import TheHeader from '@/components/TheHeader.vue'
import { useCalendarStore } from '@/features/calendar/stores/calendar-store'
import { computed, onMounted } from 'vue'
import { DateTime } from 'luxon'

const store = useCalendarStore()

const selected = computed(() =>
  store.calcPositionXForDateTime(store.selectedCalendarEvent?.end ?? DateTime.now())
)
const selectedCalendarEvent = computed(() => store.selectedCalendarEvent)
const mouse = computed(() => store.mouseCalendar)

onMounted(() => {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10 ].map((d) => {
    return {
      id: d,
      rowItem: `Item no ${d}`,
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
})
</script>

<style>
.main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar-wrapper {
  margin: 32px;
  height: 400px;
  width: 800px;
}

.pre-wrap {
  overflow: scroll;
}
</style>
