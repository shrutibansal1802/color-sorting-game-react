
import React, { useState, useEffect } from 'react'


const SingleColor = ({ gethex, index  } ) => {
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
      onClick ={()=>{
        setAlert(true)
      }}
       >

    </article>
  )
}

export default SingleColor
