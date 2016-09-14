require('babel-register')

const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const ReactRouter = require('react-router')
const match = ReactRouter.match
const RouterContext = ReactRouter.RouterContext

const ReactRedux = require('react-redux')
const Provider = ReactRedux.Provider

const Store = require('./js/Store.jsx')
const store = Store.store

const _ = require('lodash')
const fs = require('fs')
const port = 5050
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate) // fn that returns a fn

const ClientApp = require('./js/ClientApp.jsx')
const Routes = ClientApp.Routes

const app = express()

app.use('/public', express.static('./public'))

// whatever doesn't match above, matches below

app.use((req, res) => {
  match({ routes: Routes(), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) { // happy path
      const body = ReactDOMServer.renderToString(
        React.createElement(Provider, {store},
          React.createElement(RouterContext, renderProps)
        )
      )
      res.status(200).send(template({body}))
    } else {
      res.status(404).send('404 : Not Found')
    }
  })
})

console.log('---> Express server listening on port: ' + port)
app.listen(port)
