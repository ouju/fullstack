import React from 'react'
import ReactDOM from 'react-dom'

const Header = props =>
  <div>
    {props.courses.map(courses => <div key={courses.id}><h1>{courses.name}</h1> {courses.parts.map(parts => <p key={parts.id}>{parts.name} {parts.exercises}</p>)} <p>yhteensä {courses.parts.reduce((prev, curr) => prev + curr.exercises, 0)} tehtävää</p></div>)}
  </div>

/* const Total = props => {
  const total = props.parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return <p>yhteensä {total} tehtävää</p>
}

const Content = props =>
  <div>
    {props.courses.map(courses => <h1 key={courses.id}>{courses.name}</h1>)}
    {props.courses.map(courses => <p key={courses.id}>{courses.parts.name} {courses.parts.exercises}</p>)}
  </div> */

const Course = props =>
  <div>
    <Header courses={props.courses} />
    {/* <Content courses={props.courses} /> */}
    {/* <Total parts={props.courses.parts} /> */}
  </div>

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