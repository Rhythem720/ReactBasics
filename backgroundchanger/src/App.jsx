import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [bgcolor, setColor] = useState("white");

  return (
    <div className="w-full h-screen duration-200"
      style={{backgroundColor:bgcolor}} >
      <div
        className="fixed flex flex-wrap justify-center
       bottom-12 inset-x-0 px-2"
      >
        <div
          className="flex flex-wrap justify-center gap-3 shadow-lg bg-white
        px-3 py-2 rounded-3xl"
        >
          <button
           onClick={()=>setColor("red")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "red" }}
          >
            Red
          </button>
          <button
          onClick={()=>setColor("blue")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "blue" }}
          >
            Blue
          </button>
          <button
          onClick={()=>setColor("green")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "Green" }}
          >
            Green
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "yellow" }}
            onClick={()=>setColor("yellow")}
          >
            Yellow
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "black" }}
            onClick={()=>setColor("black")}
          >
            black
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
