<template>
  <div class="calendar-frame">
    <TheCalendarHeader />
    <div class="calendar-body" ref="elCal">
      <TheCalendarMenu />
      <div ref="elRows" class="calendar-rows">
        <TheRowItem v-for="item in rows" :key="item.id" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useCounterStore } from '@/stores/calendar-store'
import { useResizeObserver } from '@vueuse/core'
import TheRowItem from '@/components/TheRowItem.vue'
import TheCalendarHeader from '@/components/calendar/TheCalendarHeader.vue'
import TheCalendarMenu from '@/components/calendar/TheCalendarMenu.vue'

const store = useCounterStore()
const elCal = ref<HTMLElement>()
const elRows = ref<HTMLElement>()

onMounted(() => {
  store.setCalendarElement(elRows)
})

useResizeObserver(elCal, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  const { offsetLeft } = entry.target
  store.setCalendarWidth({ x: offsetLeft, width })
})

const rows = computed(() => store.rows)

</script>
