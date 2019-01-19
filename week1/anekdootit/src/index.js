import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const AnecdoteButton = ({ setSelected}) => {
  return (
    <button onClick={setSelected}>next anecdote</button>
  )
}

const Vote = ({ votes, selected, setVote }) => {
  votes[selected] += 1
  return (
    <button onClick={() => setVote(votes)}>vote</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(props.anecdotes.map(() => 0))
  const votes = [...vote]
  const random = Math.floor(Math.random() * props.anecdotes.length)
  const mostVotes = Math.max(...votes)
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Vote votes={votes} selected={selected} setVote={setVote}/>
      <AnecdoteButton setSelected={() => setSelected(random)}/>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[votes.indexOf(mostVotes)]}</p>
      <p>has {mostVotes} votes</p>
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