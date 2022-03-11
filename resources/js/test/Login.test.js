import { mount } from '@vue/test-utils'
import Login from '../views/Login.vue'

test('mount component', () => {
  expect(Login).toBeTruthy()

  const wrapper = mount(Login, {
    // props: {
    //   count: 4,
    // },
  })

  expect(wrapper.text()).toContain('Sign in to your account')
  expect(wrapper.html()).toMatchSnapshot()

  // await wrapper.get('button').trigger('click')

  // expect(wrapper.text()).toContain('4 x 3 = 12')

  // await wrapper.get('button').trigger('click')

  // expect(wrapper.text()).toContain('4 x 4 = 16')
})
