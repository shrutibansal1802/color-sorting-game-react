import React, { useEffect, useState } from 'react'
import SingleColor from './SingleColor'
import chroma, { hsl } from 'chroma-js'
import randomColor from 'randomcolor'

function App() {
  const[color, setColor] = useState('')
  const [error,setError] = useState(false);
  const [list,setList] = useState(chroma.scale(['#080b5c','#2a4858']).colors(20))

  function generateRandomColor(luminous){
    let newcolor = `${randomColor({luminosity:luminous})}`
    console.log(newcolor)
    return newcolor;
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    let color1= generateRandomColor('light');
    let color2 = generateRandomColor('dark');

    let colors = chroma.scale([color1,color2]).colors(25)
    setList(colors)
  }

  return (
    <>
   
    <section className='container'>
      <h3>color generator</h3>
      <form onSubmit={handleSubmit}>
        {/* <input type='text' value={color} 
        onChange={(e)=>{setColor(e.target.value)}} 
        placeholder='#f15025' 
        className={`${error? 'error': null}`}>
        </input> */}
        <button className='btn' type='submit'>Generate</button>
      </form>
    </section>

    <section className='colors'>
      {list.map((color, index) =>{
        return <SingleColor key={index}gethex={color} index={index}></SingleColor>
      })}
    </section>
    </>
  )
}

export default App
