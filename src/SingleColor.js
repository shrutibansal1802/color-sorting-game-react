
import React, { useState, useEffect } from 'react'


const SingleColor = ({ gethex, index ,setFirst, setSecond, oneselected,twoselected,setOneselected ,setTwoselected } ) => {
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])

  return (
    <article key={index} 
    className ={alert?'color-active': 'color'}
    style={
      { backgroundColor: `${gethex}` }}
      onClick ={()=>{navigator.clipboard.writeText(gethex)
        setAlert(true)
       if(oneselected)
       {setSecond(index)
      setTwoselected(true)}
      else{
        setFirst(index)
        setOneselected(true)
      }
      console.log(twoselected,oneselected)
      }
       }>

    </article>
  )
}

export default SingleColor
