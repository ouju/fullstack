import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.allClicks.length !== 0) {
    return (
      <table>
        <Statistic allClicks={props.allClicks} value={props.good} text='hyvä'/>
        <Statistic allClicks={props.allClicks} value={props.neutral} text='neutraali'/>
        <Statistic allClicks={props.allClicks} value={props.bad} text='huono'/>
        <Statistic allClicks={props.allClicks} value={props.good + props.neutral + props.bad} text='yhteensä'/>
        <Statistic allClicks={props.allClicks} value={(props.good*1 + props.neutral*0 + props.bad*-1) / (props.good + props.neutral + props.bad)} text='keskiarvo'/>
        <Statistic allClicks={props.allClicks} value={props.good / (props.good + props.neutral + props.bad) * 100} text='positiivisia'/>
      </table>
    )
  } else {
    return (
      <p>Ei yhtään palautetta annettu</p>
    )
  }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button handleClick={handleGoodClick} text='hyvä'/>
      <Button handleClick={handleNeutralClick} text='neutraali'/>
      <Button handleClick={handleBadClick} text='huono'/>
      <h1>statistiikka</h1>
      <Statistics allClicks={allClicks} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)