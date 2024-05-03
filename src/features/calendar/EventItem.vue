<template>
  <div
    class="rent-item"
    :class="{ active: isActive }"
    :draggable="isActive"
    @dragstart.self="onDragStartHandler"
    @dragend.self="onDragEndHandler"
    @click="onItemClick"
  >
    <event-resize v-if="isActive" :item="item" @change="onResizeHandler" />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from 'vue'
import { type CalendarEventItem, type CalendarRow, useCounterStore } from '@/features/calendar/stores/calendar-store'
import EventResize from '@/features/calendar/EventResize.vue'
import type { DateTime } from 'luxon'

const props = defineProps<{ item: CalendarEventItem }>()

const store = useCounterStore()

const startPosition = ref<{ rowId: number; dateTime: DateTime }>()

const isActive = computed(() => store.selectedCalendarEvent?.id === props.item.id)

const xPosition = computed(() => store.calcPositionXForDateTime(props.item.start))

const xPositionPx = computed(() => `${xPosition.value}px`)

const elementWidth = ref(store.calcPositionXForDateTime(props.item.end) - xPosition.value)

const elementWidthPx = computed(() => `${elementWidth.value}px`)

function onItemClick() {
  if (isActive.value) {
    store.setSelectedCalendarEvent(null)
  } else {
    store.setSelectedCalendarEvent(props.item)
  }
}

function onDragStartHandler() {
  if (store.activeRow) {
    startPosition.value = { rowId: store.activeRow.id, dateTime: store.activeDateTime }
  }
}

function onDragEndHandler() {
  if (startPosition.value && store.activeRow) {
    const delta = startPosition.value.dateTime.diff(store.activeDateTime)
    const fromRowIdx = store.rows.findIndex((i) => i.id === startPosition.value?.rowId)
    const toRowIdx = store.rows.findIndex((i) => i.id === store.activeRow?.id)

    if (fromRowIdx >= 0 && toRowIdx >= 0) {
      const rows = [...store.rows]
      const rowFrom: CalendarRow = rows[fromRowIdx]
      const rowTo: CalendarRow = rows[toRowIdx]

      const item = { ...props.item }

      if (item) {
        item.start = item.start.minus(delta)
        item.end = item.end.minus(delta)
      }

      if (rowFrom?.events) {
        rowFrom.events = rowFrom.events.filter((i) => i.id !== props.item.id)
      }

      if (startPosition.value.rowId === store.activeRow.id) {
        rowFrom.events?.push(item)
        rows[fromRowIdx] = rowFrom
      } else {
        rowTo.events?.push(item)
        rows[toRowIdx] = rowTo
      }

      store.setCalendarRows(rows)
    }
  }
}

function onResizeHandler(width: number) {
  elementWidth.value = width
}

watch(
  () => xPosition.value,
  (val) => {
    elementWidth.value = store.calcPositionXForDateTime(props.item.end) - val
  }
)
</script>

<style scoped>
.rent-item {
  position: absolute;
  left: v-bind(xPositionPx);
  display: flex;
  place-items: center;
  place-content: center;
  border: 3px solid var(--color-calendar-event);
  width: v-bind(elementWidthPx);
  height: 32px;
  background-color: var(--color-calendar-event);

  border-radius: 8px;
}

.active {
  border: 3px solid var(--color-border-hover);
  background-color: var(--color-background-mute);
  cursor: move;
}
</style>
