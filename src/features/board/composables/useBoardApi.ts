import type { BoardColumn } from '@/features/board/stores/board-store'
import { useBoardStore } from '@/features/board/stores/board-store'

export const useBoardApi = () => {
  const initData = async () => {
    const { setBoardData } = useBoardStore()

    const data: BoardColumn[] = [{ id: 1, label: 'New' }]

    setBoardData(data)
  }

  return {
    initData
  }
}
