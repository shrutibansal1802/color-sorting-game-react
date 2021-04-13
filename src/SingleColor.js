
import React, { useState, useEffect } from 'react'


const SingleColor = ({ gethex, index ,level } ) => {
  const [alert, setAlert] = useState(false)

  const alertclass = alert?'color-active':'color'
  const fixedcolorclass = index=='0' || index==level-1? 'fixedcolor': 'nocolor';
  const classes = alertclass;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])

  return (
    <article key={index} 
    className= { classes}
    style={
      { backgroundColor: `${gethex}` }}
      onClick ={()=>{
        setAlert(true)
      }}
       >
         <p className={fixedcolorclass}>fixed</p>

    </article>
  )
}

export default SingleColor
