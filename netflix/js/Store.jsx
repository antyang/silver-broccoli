const redux = require('redux')
const reactRedux = require('react-redux')
const { shows } = require('../public/data')

const SET_SEARCH_TERM = 'setSearchTerm'
const initialState = {
  searchTerm: '',
  shows
}

const rootReducer = (state = initialState, action) => {
  // console.debug('state', state, 'action', action)
  switch (action.type) {
    case SET_SEARCH_TERM:
      return reduceSearchTerm(state, action)
    default:
      return state
  }
}

const reduceSearchTerm = (state, action) => {
  const newState = {} // sets new empty object
  Object.assign(newState, state, {searchTerm: action.value}) // combine and overwrite state with setSearchTerm and into newSate
  return newState // return new object
}

const store = redux.createStore(rootReducer, initialState, redux.compose(
  // no idea what's going on here
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))

// this.props.searchTerm
const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    shows: state.shows
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchTerm (searchTerm) {
      dispatch({type: SET_SEARCH_TERM, value: searchTerm})
    }
  }
}

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store, rootReducer }
