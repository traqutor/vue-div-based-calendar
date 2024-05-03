import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheCalendarVue from '../TheCalendar.vue'

describe('The Calendar', () => {
  it('it should allow me to see the date range', () => {
    const wrapper = mount(TheCalendarVue, { props: { msg: 'Date range' } })
    expect(wrapper.text()).toContain('Date range')
  })
})
