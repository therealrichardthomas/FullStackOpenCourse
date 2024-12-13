import { useState } from 'react'


// code within curly braces are run as js expressions either through variable calling or operators etc.


// Hello component
// props equivalent to parameters (as an object)
const Hello = (props) => { 
  // typical way of assigning variables
  // const name = props.name;
  // const age = props.age;

  // destructuring way
  // var name based on props property names
  const {age, name} = props;
  // even further destructuring
    // this allows the name and age to get passed into the component rather than passing props as a whole
    // const Hello = ({name, age}) => {}

  const bornYear = () => new Date().getFullYear() - age;  

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Display = ({value}) => {
  return (
    <div>{value}</div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

// the App component consists of a div-tag that contains a p-tag with the words 'Hello World'
const App = () => {
  // const name = 'Peter';
  // const age = 10;
  // const [ counter, setCounter ] = useState(0); // initial value for counter

  // setTimeout(() => {
  //   setCounter(counter + 1);
  // }, 1000);

  // const increaseByOne = () => setCounter(counter + 1);
  // const decreaseByOne = () => setCounter(counter - 1);
  // const resetToZero = () => setCounter(0);

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const [value, setValue] = useState(0)

  const handleLeftClicks = () => {
    setAll(allClicks.concat('L'));
    const updatedLeft = left + 1
    setLeft(updatedLeft); 
    // setTotal(left+right) // asynchronously (doesn't need to be updated before it renders)
    setTotal(updatedLeft+right) 
  }
  const handleRightClicks = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1
    setRight(updatedRight);
    setTotal(left+updatedRight)
  }
  const setToValue = (newValue) => {
    console.log('value now', newValue);
    setValue(newValue);
  }

  return (
    <div>
      {/* <h1>Greetings</h1> */}
      {/* <Hello name="George" age={26+10}/> */}
      {/* <Hello name="Daisy" age={age}/> */}
  
      {/* <Display counter={counter} /> */}
      
      {/* increase counter */}
      {/* <Button onClick={increaseByOne} text={"plus"} /> */}
      {/* decrease counter */}
      {/* <Button onClick={decreaseByOne} text={"minus"}/> */}
      {/* reset counter */}
      {/* <Button onClick={resetToZero} text={"reset"} /> */}

      {/* {left}
      <Button handleClick={handleLeftClicks} text='left' />
      <Button handleClick={handleRightClicks} text='right' />
      {right}
      <History allClicks={allClicks} />
      <p>Total: {total}</p> */}

      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}

// shares the app file
export default App