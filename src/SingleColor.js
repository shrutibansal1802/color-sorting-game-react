
import React, { useState, useEffect } from 'react'


const SingleColor = ({ gethex, index }) => {


  return (
    <article className={`color`} style={
      { backgroundColor: `${gethex}` }}>

      {/* <p>hello</p> */}
     {/* {console.log(gethex)} */}
    </article>
  )
}

export default SingleColor
