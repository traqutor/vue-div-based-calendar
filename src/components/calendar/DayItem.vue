<template>
  <div v-if="cellWidth" class="day-item">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useCounterStore } from '@/stores/calendar-store'
import type { DateTime } from 'luxon';

defineProps<{ day: DateTime }>()

const store = useCounterStore()
const cellWidth = computed(() => store.cellWidthPx)
const cellHeight = computed(() => store.calendarRowHeightPx)
</script>

<style scoped>
.day-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-left: 1px solid var(--color-border);
  width: v-bind(cellWidth);
  height: v-bind(cellHeight);
}
</style>
