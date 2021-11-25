import './App.css'
import { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'

// prettier-ignore
function App() {
  const [preState, setPreState] = useState('')
  const [curState, setCurState] = useState('')
  const [input, setInput] = useState('0')
  const [operator, setOperator] = useState(null)
  const [total, setTotal] = useState(false)




  
  const inputNum = (e) => {
    // console.log('on num click');       
    // console.log(e);
    //two dots not allowed
    if(curState.includes(".") && e.target.innerText === ".") return;
    
    //checking if we alreagy have result
    if (total){
      setPreState("");
    }

    //setting current state
    curState ? setCurState((pre) => pre + e.target.innerText) : setCurState(e.target.innerText);
    setTotal(false);
  }




  useEffect(()=>{ //By using this Hook, you tell React that your component needs to do      omethingafter render.
    setInput(curState)
    // console.log('useEffect: curstate');
  },[curState]) //everytime when current state changes currenState will be updated


  useEffect(()=>{
    setInput("0")
    // console.log('useEffect: []]');
  },[]) //will be called just once




  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText)
    if(curState === "") return;
    if(preState !== "") {
      equals()
    }else{
      setPreState(curState);
      setCurState('');
    }}



    const equals = (e) => {
      if(e?.target.innerText === "=") {setTotal(true)};

    let cal;
    switch (operator){
      case "/": 
        cal=String(parseFloat(preState) / parseFloat(curState));
        break;
      case "+": 
        cal=String(parseFloat(preState) + parseFloat(curState));
        break;
      case "X": 
        cal=String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-": 
        cal=String(parseFloat(preState) - parseFloat(curState));
        break;
      default: return
    }
    setInput("");
    setPreState(cal);
    setCurState("");
    }
  

  const minusPlus = () => {
    if(curState.charAt(0) === "-"){
      setCurState(curState.substring(1))
    }else{
      setCurState("-"+curState)
    }
    if(preState.charAt(0) === "-"){
      setPreState(preState.substring(1))
    }else{
      setPreState("-"+preState)
    }
  }


  const percent = () => {
    preState ? setCurState(String(parseFloat(curState) / 100 * preState)) :
    setCurState(String(parseFloat(curState) / 100))
  }


  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
    // console.log('reset');
  }


  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">{input !== "" || input === "0" ?
          <NumberFormat value={input} displayType={'text'}
          thousandSeparator={true} /> 
          : 
          <NumberFormat value={preState} displayType={'text'}
          thousandSeparator={true}/>
          }
      </div>
        <div className="btn light-gray" onClick={reset}>AC</div>
        <div className="btn light-gray" onClick={percent}>%</div>
        <div className="btn light-gray" onClick={minusPlus}>+/-</div>
        <div className="btn orange" onClick={operatorType}>/</div>
        <div className="btn" onClick={inputNum}>7</div>
        <div className="btn" onClick={inputNum}>8</div>
        <div className="btn" onClick={inputNum}>9</div>
        <div className="btn orange" onClick={operatorType}>X</div>
        <div className="btn" onClick={inputNum}>4</div>
        <div className="btn" onClick={inputNum}>5</div>
        <div className="btn" onClick={inputNum}>6</div>
        <div className="btn orange" onClick={operatorType}>+</div>
        <div className="btn" onClick={inputNum}>1</div>
        <div className="btn" onClick={inputNum}>2</div>
        <div className="btn" onClick={inputNum}>3</div>
        <div className="btn orange" onClick={operatorType}>-</div>
        <div className="btn zero" onClick={inputNum}>0</div>
        <div className="btn" onClick={inputNum}>.</div>
        <div className="btn orange" onClick={equals}>=</div>
      </div>
    </div>
  )


}
export default App
