import { useState, useCallback ,useEffect,useRef} from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setPassword] = useState("");

  //gives refernce of an element and perfom manipulation
  //ref={password} we have to set through ref in particular element
  const passwordRef=useRef(null);
  const copyPasswordtoClipboard=useCallback(()=>{
    //to select that is in paswordRef 
    passwordRef.current?.select();
    //particular selection upto some range
   // passwordRef.current?.setSelectionRange(0,5)
     window.navigator.clipboard.writeText(password);
  },[password])


 //useCallback is used for memorization so that it can load faster 
 //in first it contains the function and in second it contains dependencies

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*(){}~+=-";

    for (let index = 1; index <= length; index++) {
      //generates a random number lesser than string length then we assign chararcter of that position to pass;
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberallowed, charallowed,setPassword]);
  
  
  //useeffect calls when page loads and aslo reruns when one of the dependenceies changes
  useEffect(()=>{passwordgenerator()},[length, numberallowed, charallowed,passwordgenerator])
  return (
    <div
      className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-blue-600
    bg-green-300"
    >
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          ref={passwordRef}
          readOnly
        />
        <button
          className="outline-none bg-blue-700 text-red px-3 py-0.5
          shrink-0"
          onClick={copyPasswordtoClipboard}
        >Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={50} value={length} 
          className="'cursor-pointor"
          onChange={(e)=>{setlength(e.target.value)}}/>
          <label>Length:{length}</label>
          
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={numberallowed}
          id="numberinput"
          onChange={()=>{setnumberallowed((prev)=>!prev)}}/>
        <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={charallowed}
          id="characterinput"
          onChange={()=>{setcharallowed((prev)=>!prev)}}/>
        <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
