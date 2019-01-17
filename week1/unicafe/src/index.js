import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>hyvä {props.good}</p>
        <p>neutraali {props.neutral}</p>
        <p>huono {props.bad}</p>
        <p>yhteensä {props.good + props.neutral + props.bad} </p>
        <p>keskiarvo {(props.good*1 + props.neutral*0 + props.bad*-1) / (props.good + props.neutral + props.bad)}</p>
        <p>positiivisia {props.good / (props.good + props.neutral + props.bad) * 100} %</p>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>anna palautetta</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>hyvä</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutraali</button>
        <button onClick={() => setBad(bad + 1)}>huono</button>
      </div>
      <h1>statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)