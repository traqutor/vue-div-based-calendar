<template>
  <div class="calendar-menu">
    <div v-for="row in rows" :key="row.id" class="menu-item" :class="{ active: isActive(row.id) }">
      {{ row.id }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCounterStore } from '@/stores/calendar-store'

const store = useCounterStore()

const rows = computed(() => store.rows)
const menuWidth = computed(() => store.menuWidthPx)
const itemHeight = computed(() => store.calendarRowHeightPx)

function isActive(id: number) {
  return store.activeRow?.id === id
}
</script>

<style>
.calendar-menu {
  width: v-bind(menuWidth);
}

.menu-item {
  height: v-bind(itemHeight);
  border-bottom: 1px solid var(--color-border);

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  gap: 0.5rem;
}

.active {
  background-color: var(--vt-c-divider-dark-2);
}
</style>
