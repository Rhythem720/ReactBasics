import { useState } from 'react'

import './App.css'

function App() {
  //let count =5;
 const[count,setcount]= useState(5)
 const addValue=()=>{
  //count =count+1;
  if(count<20)
  setcount(count+1);
  console.log(count);
 }
 const subtractValue=()=>{
  //count =count-1;
  if(count>0)
  setcount(count-1)
  console.log(count);
 }
 
  return (
    <>
      <h1>
        This is the simple counter app
      </h1>
      <h2>
        counter value : {count}
      </h2>
      <button 
       onClick={addValue}
      >Add Count</button>
      <button
      onClick={subtractValue}
      >Subtract Count</button>


    </>
  )
    }

export default App
