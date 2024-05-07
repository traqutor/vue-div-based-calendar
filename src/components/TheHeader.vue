<script setup lang="ts">
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { useCalendarStore } from '@/features/calendar/stores/calendar-store'
import TheIconItem from '@/components/TheIconItem.vue'

const store = useCalendarStore()

function skipPrevDay() {
  store.shiftPrevDay()
}

function skipNextDay() {
  store.shiftNextDay()
}
</script>

<template>
  <div class="app--header">
    <RouterLink to="/calendar">
      <TheIconItem>
        <EcosystemIcon />
      </TheIconItem>
    </RouterLink>

    <RouterLink to="/kanban">
      <TheIconItem>
        <EcosystemIcon />
      </TheIconItem>
    </RouterLink>

    <TheIconItem @click="skipPrevDay">
      <CommunityIcon />
    </TheIconItem>

    <TheIconItem @click="skipNextDay">
      <SupportIcon />
    </TheIconItem>
  </div>
</template>
