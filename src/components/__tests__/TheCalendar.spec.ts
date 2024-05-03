import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheCalendarVue from '../calendar/TheCalendar.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(TheCalendarVue, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
