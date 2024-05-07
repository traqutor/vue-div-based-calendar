import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheKanbanVue from '../TheBoard.vue'

describe('The Board', () => {
  it('it should allow me to see the Board', () => {
    const wrapper = mount(TheKanbanVue, { props: { msg: 'Board' } })
    expect(wrapper.text()).toContain('Board')
  })
})
