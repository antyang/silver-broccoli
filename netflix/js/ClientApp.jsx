const React = require('react')
const { Provider } = require('react-redux')
const { Router, Route, IndexRoute, browserHistory } = require('react-router')
const { store } = require('./Store')

const Search = require('./Search')
const Landing = require('./Landing')
const Layout = require('./Layout')
const Details = require('./Details')

const myRoutes = () => (
  <Route path='/' component={Layout}>
    <IndexRoute component={Landing} />
    <Route path='/search' component={Search} />
    <Route path='/details/:id' component={Details} />
  </Route>
)

const App = React.createClass({
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {myRoutes()}
        </Router>
      </Provider>
    )
  }
})

App.Routes = myRoutes

module.exports = App
