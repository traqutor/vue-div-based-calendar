<template>
  <div class="calendar-header">
    <div class="calendar-header--filter">Filter</div>
    <div 
      v-for="(day, index) in days" 
      :key="index" class="calendar-header--item" 
      :class="{ active: isActive(day) }"
      >
        {{ day.day }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/calendar-store'
import { computed } from 'vue'
import type{ DateTime } from 'luxon';

const store = useCounterStore()

const days = computed(():DateTime[] => store.days)
const headerHeight = computed(() => store.calendarHeaderHeightPx)
const filterWidth = computed(() => store.menuWidthPx)
const itemWidth = computed(() => store.cellWidthPx)

function isActive(day: DateTime) {
  return store.activeColumn?.day === day.day
}
</script>

<style scoped>
.calendar-header {
  width: 100%;
  border-bottom: 1px solid var(--color-border);

  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.calendar-header--filter {
  width: v-bind(filterWidth);

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1rem;
}

.calendar-header--item {
  width: v-bind(itemWidth);
  height: v-bind(headerHeight);
  display: flex;
  align-items: center;
  justify-content: center;

  border-left: 1px solid var(--color-border);
}

.active {
  background-color: var(--vt-c-divider-dark-2);
}
</style>
