<template>
  <main>
    <TheHeader />
    <div class="main-wrapper">
      <div class="calendar-wrapper">
        <TheCalendar />
      </div>
      <div class="pre-wrap">
        <pre>E: {{ selected }}</pre>
        <pre>R: {{ selectedCalendarEvent }}</pre>
        <pre>{{ mouse }}{{ i }}</pre>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TheCalendar from '@/features/calendar/TheCalendar.vue'
import TheHeader from '@/components/TheHeader.vue'
import { useCounterStore } from '@/features/calendar/stores/calendar-store'
import { computed, onMounted } from 'vue'
import { DateTime } from 'luxon'
import { useCalendarApi } from '@/features/calendar/composables/useCalendarApi'

const { initData } = useCalendarApi()
const store = useCounterStore()

const i = computed(() => store.count)

const selected = computed(() =>
  store.calcPositionXForDateTime(store.selectedCalendarEvent?.end ?? DateTime.now())
)
const selectedCalendarEvent = computed(() => store.selectedCalendarEvent)
const mouse = computed(() => store.mouseCalendar)

onMounted(() => {
  initData()
})
</script>

<style>
.main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar-wrapper {
  margin: 32px;
  height: 600px;
  width: 1200px;
}

.pre-wrap {
  overflow: scroll;
}
</style>
