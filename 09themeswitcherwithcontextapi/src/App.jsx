
import { useState } from "react";
import "./App.css";
import { ThemeContextProvider } from "./context/Theme";
import { useEffect } from "react";
import Themebutton from "./components/Themebutton";
import Card from "./components/Card";
//import { Form ,FormGroup,Input,Label,Button} from "reactstrap";


function App() {
 const [themeMode,setthemeMode]=useState("light")
 const[addContent,setAddContent]=useState()
 const lightTheme=()=>{
  setthemeMode("light")
 }
 const darkTheme=()=>{
  setthemeMode("dark")
 }
 const changeContent=()=>{
  if(themeMode=="dark")
  setAddContent("This is the Dark Mode")
 else 
 setAddContent("")
 }
 //actual change in theme
useEffect(()=>{
  document.querySelector('html').classList.remove("light","dark")
  document.querySelector('html').classList.add(themeMode)
  changeContent()
},[themeMode])

 
  return (
    <ThemeContextProvider value={{themeMode,lightTheme,darkTheme,addContent,changeContent}}>
<div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                        <Themebutton/>
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                       <Card/>
                    </div>
                </div>
            </div>
            <div>
            {/* <Form className="w-half" >
    <FormGroup floating>
      <Input
        id="exampleEmail"
        name="email"
        placeholder="Email"
        type="email"
      />
      <Label for="exampleEmail">
        Email
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
      />
      <Label for="examplePassword">
        Password
      </Label>
    </FormGroup>
    {' '}
    <Button>
      Submit
    </Button>
  </Form> */}
            </div>
 </ThemeContextProvider>
  );
}

export default App;
