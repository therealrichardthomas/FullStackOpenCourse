import { useState } from 'react'

const StatisticLine = ({text, counter}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{counter}</td>
    </tr>
  )
}
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Average = ({text, score, total}) => {
  return (
    <p>{text} {score/total}</p>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) *100;

  if (total === 0) {
    return (
      <p>no feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' counter={good} />
        <StatisticLine text='neutral' counter={neutral} />
        <StatisticLine text='bad' counter={bad} />
        <tr>
          <td>all</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{positive}%</td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    const updateGood = good + 1;
    setGood(updateGood)
  }
  const increaseNeutral = () => {
    const updateNeutral = neutral + 1;
    setNeutral(updateNeutral)
  }
  const increaseBad = () => {
    const updateBad = bad + 1;
    setBad(updateBad)
  } 

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={increaseGood} text='good'/>
      <Button onClick={increaseNeutral} text='neutral'/>
      <Button onClick={increaseBad} text='bad'/>
      
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App