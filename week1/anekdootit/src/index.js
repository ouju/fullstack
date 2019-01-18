import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const AnecdoteButton = (props) => {
  return (
    <button onClick={props.setSelected}>next anecdote</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  const votes = [...vote]
  const random = Math.floor(Math.random() * props.anecdotes.length)
  const mostVotes = Math.max.apply(null, votes)

  const Vote = () => {
    votes[selected] += 1
    setVote(votes)
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <button onClick={Vote}>vote</button>
      <AnecdoteButton setSelected={() => setSelected(random)}/>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[votes.indexOf(mostVotes)]}</p>
      <p>has {votes[vote.indexOf(mostVotes)]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)