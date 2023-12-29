<template>
  <div class="drv-handle" draggable="true" @drag="resizeDrag" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { type CalendarEventItem, useCounterStore } from '@/stores/calendar-store'

const props = defineProps<{ item: CalendarEventItem }>()

const emit = defineEmits<{
  (e: 'change', width: number): void
}>()

const item = ref(props.item)

const store = useCounterStore()

function resizeDrag() {
  item.value.end = store.activeDateTime
  const width =
    store.calcPositionXForDateTime(props.item.end) -
    store.calcPositionXForDateTime(props.item.start)
  emit('change', width >= 0 ? width : 0)
}
</script>

<style scoped>
.drv-handle {
  transform: translate(100%, -50%);
  top: 50%;
  right: -3px;
  cursor: ew-resize;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 24px;
  background-color: var(--color-border-hover);
  z-index: 99;
}
</style>
