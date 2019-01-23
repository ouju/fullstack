import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const names = [
  {
    id: 1,
    content: 'Arto Hellas',
    date: '2017-12-10T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Matti Luukkainen',
    date: '2017-12-10T18:39:34.091Z',
    important: false
  }
]

ReactDOM.render(
  <App names={names} />,
  document.getElementById('root')
)