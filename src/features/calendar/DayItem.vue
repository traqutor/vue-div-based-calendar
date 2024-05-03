<script lang="ts" setup>
import { computed } from 'vue'
import { useCounterStore } from '@/features/calendar/stores/calendar-store'
import type { DateTime } from 'luxon'

defineProps<{ day: DateTime }>()

const store = useCounterStore()
const cellWidth = computed(() => store.cellWidthPx)
const cellHeight = computed(() => store.calendarRowHeightPx)

const contextMenu = () => {
  console.log('aaa')
}

</script>

<template>
  <div v-if="cellWidth" class="day-item" @contextmenu.prevent="contextMenu()">
    <slot></slot>
  </div>
</template>


<style scoped>
.day-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-left: 1px solid var(--color-border);
  width: v-bind(cellWidth);
  height: v-bind(cellHeight);

  &:hover {
    background-color: var(--vt-c-divider-dark-2);
  }
}
</style>
