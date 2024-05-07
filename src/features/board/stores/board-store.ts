import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface BoardColumn {
  id: number
  label: string
}

export const useBoardStore = defineStore('board', () => {
  const board = ref([] as BoardColumn[])

  // getters
  const boardData = computed(() => board.value)

  // actions
  function setBoardData(data: BoardColumn[]) {
    board.value = data
  }

  return {
    boardData,
    setBoardData
  }
})
