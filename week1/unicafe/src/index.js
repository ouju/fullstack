import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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
      <p>hyvä {good}</p>
      <p>neutraali {neutral}</p>
      <p>huono {bad}</p>
      <p>yhteensä {good + neutral + bad} </p>
      <p>keskiarvo {(good*1 + neutral*0 + bad*-1) / (good + neutral + bad)}</p>
      <p>positiivisia {good / (good + neutral + bad) * 100} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)