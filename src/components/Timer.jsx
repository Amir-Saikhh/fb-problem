import React from 'react'
import Countdown from 'react-countdown'
const Timer = () => {
  return (
    <div>
    <Countdown date={Date.now()+ 30 * 1000}/>
    </div>
  )
}

export default Timer