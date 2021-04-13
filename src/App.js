import React, { useEffect, useState } from 'react'
import SingleColor from './SingleColor'
import chroma from 'chroma-js'
import randomColor from 'randomcolor'

function App() {
  const [first, setFirst] = useState();      //index of 1st selected color
  const [second, setSecond] = useState()     //index of 2nd selected color
  const [oneselected, setOneselected] = useState(false);
  const [twoselected, setTwoselected] = useState(false);
  const [level, setLevel] = useState(15);

  const [started, setStarted] = useState(false);
  const [list, setList] = useState(chroma.scale(['#080b5c', '#faa']).colors(level))
  const [correctlist, setCorrectlist] = useState(chroma.scale(['#080b5c', '#faa']).colors(level))

  function generateRandomColor(luminous) {
    let newcolor = `${randomColor({ luminosity: luminous })}`
    return newcolor;
  }


  const handleSubmit = (currentlevel =level) => {
    setStarted(false);
    console.log("handlesubmit",level)
    let color1 = generateRandomColor('light');
    let color2 = generateRandomColor('dark');

    let colors = chroma.scale([color1, color2]).colors(currentlevel)
    setCorrectlist([...colors])
    setList([...colors])
    // console.log("cl", correctlist, "l", list)
    // console.log("colors", colors)
  }

  function shuffleArray(arr) {

    for (let i = arr.length - 2; i > 1; --i) {
      const j = 1 + Math.floor(Math.random() * i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return [...arr];
  }

  const swap = () => {
    // console.log("beforeswap", "cl", correctlist, "l", list)
    let newList = [...list]
    if (oneselected && twoselected) {
      [newList[second], newList[first]] = [newList[first], newList[second]]
    }
    setList([...newList])

    // setOneselected(false)
    // setTwoselected(false)
    // console.log("afterswap", "cl", correctlist, "l", list)
  }

  useEffect(() => {
    { (twoselected && oneselected) && swap() }
    if (JSON.stringify(correctlist) == JSON.stringify(list) && started) {
      alert("you win")
      // console.log(oneselected, twoselected)
    }
    return (() => { setTwoselected(false); setOneselected(false) })
  }, [twoselected])


  return (
    <>
      <section className='container'>
        {/* <h3>color generator</h3> */}
          <button className='btn' onClick={()=>{handleSubmit()}}>Generate new colors</button>
  
        <button className='btn' onClick={() => {
          setList([...shuffleArray(list)])
          setStarted(true)
          // console.log("stbtn", "cl", correctlist, "l", list)
        }}>start game</button>

        <div class="dropdown">
          <button class="btn">level</button>
          <div class="dropdown-content">
            <button onClick={()=>{setLevel(15); 
              handleSubmit(15) ;console.log(level)}}>Easy: 5*3</button>
            <button  onClick={()=>{setLevel(20); handleSubmit(20);console.log("after pressing medium",level)}} >Medium : 5*4</button>
            <button  onClick={()=>{setLevel(25); handleSubmit(25)}}>Hard: 5*5</button>
          </div>
        </div>
      </section>

      <section className='colors'>
        {list.map((color, index) => {
          return <div key={index}
            className='color-cont'
            onClick={() => {
              navigator.clipboard.writeText(color)
              if (oneselected) {
                setSecond(index)
                setTwoselected(true)
              }
              else {
                setFirst(index)
                setOneselected(true)
              }
              console.log(twoselected, oneselected)
            }
            }>
            <SingleColor key={index} gethex={color}
              index={index}
              level={level}

            ></SingleColor>
          </div>
        })}
      </section>
    </>
  )
}

export default App
