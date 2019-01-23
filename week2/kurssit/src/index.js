import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({courses}) =>
  courses.map(courses => 
    <div key={courses.id}>
      <Header name={courses.name}/>
      <Content parts={courses.parts} /> 
      <Total parts={courses.parts} />
    </div>)

const Header = ({name}) =>
  <h1>{name}</h1>

const Content = ({parts}) =>
  parts.map(parts => 
  <div key={parts.id}>
    <Part name={parts.name} exercises={parts.exercises} />
  </div>)

const Part = ({name, exercises}) =>
  <p>{name} {exercises}</p>

const Total = ({parts}) => {
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return <p>yhteensä {total} tehtävää</p>
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 10,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <div>
      <h1>Opetusohjelma</h1>
      <Course courses={courses} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)