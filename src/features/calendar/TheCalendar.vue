<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useCalendarStore } from '@/features/calendar/stores/calendar-store'
import { useResizeObserver } from '@vueuse/core'
import RowContent from '@/features/calendar/RowContent.vue'
import TheCalendarHeader from '@/features/calendar/TheCalendarHeader.vue'
import TheCalendarMenu from '@/features/calendar/TheCalendarMenu.vue'
import { useCalendarApi } from '@/features/calendar/composables/useCalendarApi'

const { initData } = useCalendarApi()
const store = useCalendarStore()
const elCal = ref<HTMLElement>()
const elRows = ref<HTMLElement>()

onMounted(() => {
  initData();

})

useResizeObserver(elCal, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  const { clientLeft } = entry.target
  store.setCalendarWidth({ x: clientLeft, width })
})

const rows = computed(() => store.rows)
</script>

<template>
  <div class="calendar--wrapper">
    <div class="calendar--frame">
      <TheCalendarHeader />
      <div class="calendar--body" ref="elCal">
        <TheCalendarMenu />
        <div ref="elRows" class="calendar--rows">
          <RowContent v-for="item in rows" :key="item.id" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* calendar variables */
:root {
  --calendar-header-height: 64px;
}

.calendar--wrapper {
  margin: 32px;
  height: calc(80vh - var(--calendar-header-height));
  width: 1200px;
}

.calendar--frame {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}

.calendar--body {
  display: flex;
  overflow-y: scroll;
}

.calendar--rows {
  overflow-x: clip;
}
</style>
