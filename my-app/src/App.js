import './App.css';
import { useEffect, useState } from 'react';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase/app'
import Date from './Date';


function App() {
  const [input,setinput]=useState("")
  const [datetime, setdatetime] = useState("");
  const [mydates, setmydates] = useState([]);
  const [mytimes, setmytimes] = useState([]);
  const [todos, settodos] = useState([]);
  // when the app loads we need to listen the db and fetch new todo when added/deleted with the help of useeffect

  useEffect(() => {
    // this code runs when app loads
    db.collection("todos").orderBy('timestamp','desc').onSnapshot(snapshot=>{
      // console.log(snapshot.docs.map(doc=>doc))
      settodos(snapshot.docs.map(doc=>({id:doc.id,todo:doc.data().todo})))
    })
  }, [])
  
  const addtodos=(e)=>{
    e.preventDefault();
    db.collection("todos").add({
      todo:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    var splited=datetime.split("T");
    settodos([...todos,input])
    setinput("")//clear input field after clicking the button
    setmydates([...mydates,splited[0]]);
    setmytimes([...mytimes,splited[1]]);
  
  }


  return (
    <div className="App">
      <form action="">
      <input type="text" id="inp" value={input} onChange={(e)=>setinput(e.target.value)}/>
      <input
        type="datetime-local"
        onChange={(e) => setdatetime(e.target.value)}
      />
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
      {/* <ul>
        {
          mydates.map((mydate)=>{
            return(
              // <li>{mydate}</li>
              <Date d={mydate}/>
            )
          })
        }
      </ul> */}
    </div>
  );
}

export default App;
