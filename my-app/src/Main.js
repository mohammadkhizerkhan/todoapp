import './App.css';
import { useEffect, useState } from 'react';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase/app'

import React from 'react'

function Main() {
    const [input,setinput]=useState("")
    
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
      
      settodos([...todos,input])
      setinput("")//clear input field after clicking the button
    }
    return (
        <div>
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
    )
}

export default Main


