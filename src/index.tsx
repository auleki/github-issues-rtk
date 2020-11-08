import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store'

const render = () => {
  const App = require('./app/App').default;
  const root = document.getElementById('root')

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  )
}

render() 

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", render)
}

// ReactDOM.render(<App />, document.getElementById('root'))
