<template>
  <main class="main--wrapper">
    <TheHeader />
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
</script>

<style>
.main--wrapper {
  display: flex;
  flex-direction: column;
}
</style>
