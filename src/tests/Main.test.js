import React from 'react';
import { mount } from 'enzyme';
import Main from '../components/Main';
import '../setUpTests'

describe('Main', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Main />);
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  })
  
  it('displays error on invalid input',  () => {
    wrapper.find('input[type="text"]').simulate('change', {
      target: { value: 'test' }
    })
    expect(wrapper.find('.alert-danger')).toHaveLength(1)
    wrapper.find('input[type="text"]').simulate('change', {
      target: { value: 45 }
    })
    expect(wrapper.find('.alert-danger')).toHaveLength(0)
  })

  it('generates numbers', () => {
    wrapper.find('input[type="text"]').simulate('change', {
      target: { value: 45 }
    })
    wrapper.find('.btn').first().simulate('click')
    expect(wrapper.find('.number-container')).toHaveLength(45)
  })

  it('gets data from local storage', () => {
    localStorage.setItem('phoneNumbers', JSON.stringify(['0123456789', '0987654321']))
    const wrapper2 = mount(<Main />);
    expect(wrapper2.find('.number-container')).toHaveLength(2)
    wrapper2.unmount()
  })
  
  it('handles sort', () => {
    localStorage.setItem('phoneNumbers', JSON.stringify(['0123456789', '0987654321']))
    wrapper.find('input[type="radio"]').first().simulate('change', {
      target: { value: 'ascending' }
    })
    expect(wrapper.find('.number-container').first().text()).toBe('1. 0123456789')
    wrapper.find('input[type="radio"]').first().simulate('change', {
      target: { value: 'descending' }
    })
    expect(wrapper.find('.number-container').first().text()).toBe('1. 0987654321')
  })

})
