/* eslint-env mocha */

const { expect } = require('chai')
const { shallow, mount } = require('enzyme') // mount is slower than shallow
const { shows } = require('../public/data')

const React = require('react')
const Search = require('../js/Search')
const ShowCard = require('../js/ShowCard')

const { store, rootReducer } = require('../js/Store')

// react test
xdescribe('<Search />', () => {
  it('should render the brand', () => {
    // only find elements in Search component and not the children
    const wrapper = shallow(<Search />)
    expect(wrapper.contains(<h1 className="brand">svideo</h1>)).to.be.true
  })

  it('should render as many shows as there are data for', () => {
    const wrapper = shallow(<Search />)
    expect(wrapper.find(ShowCard).length).to.equal(shows.length)
  })

  it('should filter correctly given new state', () => {
    // why mount ?
    // mount simulate events and change the value of input
    // mount searches for class ratherthan component
    const wrapper = mount(<Search />)
    const input = wrapper.find('.search-input')

    // talking directly to the DOM node
    input.node.value = 'house'
    input.simulate('change')
    expect(wrapper.state('searchTerm')).to.equal('house')
    expect(wrapper.find('.show-card').length).to.equal(2)
  })
})

// redux test
describe('Store', () => {
  it('should bootstrap', () => {
    const state = rootReducer(undefined, { type: '@@redux/INIT' }) // this is the action it sends
    expect(state).to.deep.equal({ searchTerm: '' })
  })
  it('should handle setSearchTerm actions', () => {
    const state = rootReducer({ searchTerm: 'some random string' }, { type: 'setSearchTerm', value: 'correct string' })
    // ^ initial state
    expect(state).to.deep.equal({ searchTerm: 'correct string' })
  })
})
