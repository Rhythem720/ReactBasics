import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
function App2() {
  const username ="this is the username"
 
   return (
    <>This is rhythem2 </>
   )
 }
 
//  const reactElement= (
//   <a href="www.google.com" target='_blank'>Go to google</a>
//  )
const reactElement= React.createElement(
  'a',
  {
    href:"https://google.com",target:"_blank"
  },
  "CLick to open google"
)


 
ReactDOM.createRoot(document.getElementById('root')).render(
  

   
  reactElement

)
