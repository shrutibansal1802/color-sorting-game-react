import React, { useEffect, useState } from 'react'
import SingleColor from './SingleColor'
import chroma from 'chroma-js'
import randomColor from 'randomcolor'

function App() {
  const [first, setFirst] = useState();      //index of 1st selected color
  const [second, setSecond] = useState()     //index of 2nd selected color
  const [oneselected, setOneselected] = useState(false);
  const [twoselected, setTwoselected] = useState(false);

  const [list, setList] = useState(chroma.scale(['#080b5c', '#faa']).colors(25))
  const [correctlist, setCorrectlist] = useState(chroma.scale(['#080b5c', '#faa']).colors(25))

  function generateRandomColor(luminous) {
    let newcolor = `${randomColor({ luminosity: luminous })}`
    return newcolor;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handlesubmit")
    let color1 = generateRandomColor('light');
    let color2 = generateRandomColor('dark');

    let colors = chroma.scale([color1, color2]).colors(25)
    setCorrectlist([...colors])
    setList([...colors])
    console.log("cl", correctlist, "l", list)
    console.log("colors", colors)
  }

  function shuffleArray(array) {
    return [...array.sort(() => Math.random() - 0.5)];
  }

  const swap = () => {
    console.log("beforeswap", "cl", correctlist, "l", list)
    let newList = [...list]
    if (oneselected && twoselected) {
      [newList[second], newList[first]] = [newList[first], newList[second]]
    }
    setList([...newList])

    setOneselected(false)
    setTwoselected(false)
    console.log("afterswap", "cl", correctlist, "l", list)
  }

  useEffect(() => {
    { (twoselected && oneselected) && swap() }
    console.log("hello")
  }, [twoselected])


  return (
    <>
      <section className='container'>
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <button className='btn' type='submit'>Generate</button>
        </form>
        <button className='btn' onClick={() => {
          setList([...shuffleArray(list)])
          console.log("stbtn", "cl", correctlist, "l", list)
        }}>start</button>
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

            ></SingleColor>
          </div>
        })}
      </section>
    </>
  )
}

export default App
