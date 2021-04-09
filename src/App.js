import React, { useEffect, useState } from 'react'
import SingleColor from './SingleColor'
import chroma, { hsl } from 'chroma-js'
import randomColor from 'randomcolor'

function App() {
  const [first, setFirst] = useState();
  const [second, setSecond] = useState()
  const [oneselected, setOneselected] = useState(false);
  const [twoselected, setTwoselected] = useState(false);

  const [list, setList] = useState(chroma.scale(['#080b5c', '#faa']).colors(20))

  function generateRandomColor(luminous) {
    let newcolor = `${randomColor({ luminosity: luminous })}`
    console.log(newcolor)
    return newcolor;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let color1 = generateRandomColor('light');
    let color2 = generateRandomColor('dark');

    let colors = chroma.scale([color1, color2]).colors(25)
    const correctList = colors;
    setList(colors)
  }
  function swap() {
    let newList = list
    if (oneselected && twoselected) {
      [newList[second] ,newList[first]]=[newList[first] , newList[second]]
    }
    setList(newList)
    console.log(list)
    setOneselected(false)
    setTwoselected(false)
  }

  useEffect(() => { swap() }, [twoselected])

 
  return (
    <>
      <section className='container'>
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <button className='btn' type='submit'>Generate</button>
        </form>
      </section>

      <section className='colors'>
        {list.map((color, index) => {
          return <SingleColor key={index} gethex={color}
            index={index}
            setFirst={setFirst}
            setSecond={setSecond}
            oneselected={oneselected}
            twoselected={twoselected}
            setOneselected={setOneselected}
            setTwoselected={setTwoselected}></SingleColor>
        })}
      </section>
    </>
  )
}

export default App
