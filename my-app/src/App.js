import './App.css';
import { useState } from 'react';
import Todo from './Todo';

function App() {
  const [input,setinput]=useState("")
  const [todos, settodos] = useState(["a","b"]);
  const addtodos=(e)=>{
    // console.log(todos)
    e.preventDefault();
    settodos([...todos,input])
    setinput("")
  }
  return (
    <div className="App">
      <form action="">
      <input type="text" id="inp" value={input} onChange={(e)=>setinput(e.target.value)}/>
      <button id="btn" type="submit" disabled={!input} onClick={addtodos}>add</button>
      </form>
      <ul>
        {
          todos.map((todo)=>{
            return(
              <Todo item={todo}/>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
