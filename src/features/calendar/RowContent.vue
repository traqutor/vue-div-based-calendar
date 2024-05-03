<template>
  <div class="row-item" @drop.self="onDrop" @dragover.prevent @dragenter.prevent>
    <template v-for="(day, index) in days" :key="index">
      <TheDayItem :day="day" />
    </template>
    <TheCalendarEventItem v-for="i in item.events" :key="i.id" :item="i" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { type CalendarRow, useCounterStore } from '@/features/calendar/stores/calendar-store'
import TheDayItem from '@/features/calendar/DayItem.vue'
import TheCalendarEventItem from '@/features/calendar/EventItem.vue'

defineProps<{ item: CalendarRow }>()

const store = useCounterStore()
const days = computed(() => store.days)
const cellHeight = computed(() => store.calendarRowHeightPx)

function onDrop(e: DragEvent) {
  console.log(e)
}
</script>

<style scoped>
.row-item {
  display: flex;
  position: relative;
  height: v-bind(cellHeight);

  place-items: center;
  place-content: flex-start;
  border-bottom: 1px solid var(--color-border);
}
</style>
