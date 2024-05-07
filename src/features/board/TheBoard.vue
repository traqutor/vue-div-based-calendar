<script setup lang="ts">
import { computed } from 'vue'
import { useBoardStore } from '@/features/board/stores/board-store'

const store = useBoardStore()
const data = computed(() => store.boardData)
</script>

<template>
  <div class="board--frame">
    <div class="board--body">Kanban {{ data }}</div>
  </div>
</template>

<style scoped>
/* kanban variables */
:root {
  --board-header-height: 64px;
}

.board--frame {
  width: 100%;
  height: calc(100% - var(--board-header-height));
  display: grid;
  grid-template-rows: auto 1fr;
}

.board--body {
  display: flex;
  overflow-y: scroll;
}
</style>
