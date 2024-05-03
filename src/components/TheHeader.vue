<template>
  <div class="app--header">
    <TheIconItem>
      <EcosystemIcon />
    </TheIconItem>

    <TheIconItem @click="skipPrevDay">
      <CommunityIcon />
    </TheIconItem>

    <TheIconItem @click="skipNextDay">
      <SupportIcon />
    </TheIconItem>
  </div>
</template>

<script setup lang="ts">
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { useCounterStore } from '@/features/calendar/stores/calendar-store'
import TheIconItem from '@/components/TheIconItem.vue'

const store = useCounterStore()

function skipPrevDay() {
  store.shiftPrevDay()
}

function skipNextDay() {
  store.shiftNextDay()
}
</script>
