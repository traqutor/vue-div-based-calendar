<script lang="ts" setup>
import { computed } from 'vue'
import { type CalendarRow, useCalendarStore } from '@/features/calendar/stores/calendar-store'
import DayItem from '@/features/calendar/DayItem.vue'
import EventItem from '@/features/calendar/EventItem.vue'
import type { DateTime } from 'luxon'

defineProps<{ item: CalendarRow }>()

const store = useCalendarStore()
const days = computed((): DateTime[] => store.days)
const cellHeight = computed(() => store.calendarRowHeightPx)

</script>

<template>
  <div class="calendar-row--item" @dragover.prevent @dragenter.prevent>
    <template v-for="(day) in days" :key="day.day">
      <DayItem :day="day" />
    </template>
    <EventItem v-for="i in item.events" :key="i.id" :item="i" />
  </div>
</template>

<style scoped>
.calendar-row--item {
  display: flex;
  position: relative;
  height: v-bind(cellHeight);

  place-items: center;
  place-content: flex-start;
  border-bottom: 1px solid var(--color-border);
}
</style>
