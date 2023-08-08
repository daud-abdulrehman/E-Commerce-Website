import React from 'react'
import {useState} from "react"
import { Button } from '@mui/material';

function Increment() {
    const [number,setNumber]=useState(0)
    return (
      <div className="App">
        {number}
        <br/>
        <Button onClick={() => setNumber(number + 1)} variant="contained">Increment</Button>
        <Button onClick={() => setNumber(number - 1)} variant="contained">Decrement</Button>



      </div>
    );
  }

  export default Increment;