import './App.css';
import { useEffect, useState } from 'react';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase/app'

import React from 'react'

function Main() {
    const [todo, settodo] = useState({
        todoname: "",
        tododate: "",
        todotime: ""
      }); 
    
    const [todos, settodos] = useState([]);
    // when the app loads we need to listen the db and fetch new todo when added/deleted with the help of useeffect
  
    useEffect(() => {
      // this code runs when app loads
      db.collection("todos").orderBy('timestamp','desc').onSnapshot(snapshot=>{
        // console.log(snapshot.docs.map(doc=>doc.data().todo))
        settodos(snapshot.docs.map(doc=>({id:doc.id,todo:doc.data().todo})))
      })
    }, [])
    
    const addtodos=(e)=>{
      e.preventDefault();
      db.collection("todos").add({
        // this json.stringify is important
        todo:JSON.stringify(todo),
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      
      settodos([...todos,todo])
      settodo("")//clear input field after clicking the button
      console.log(todos)
    }
    return (
        <div>
            <form action="">
            <input
        type="text"
        value={todo.todoname}
        onChange={(e) => settodo({ ...todo, todoname: e.target.value })}
      />
      <input
        type="date"
        onChange={(e) => {
          settodo({ ...todo, tododate: e.target.value.split("T")[0] });
        }}
      />
      <input
        type="time"
        onChange={(e) => {
          settodo({ ...todo, todotime: e.target.value.split("T")[0] });
        }}
      />
     
      <button id="btn" type="submit" disabled={!todo} onClick={addtodos}>add</button>
      </form>
      <ul>
        {
          todos.map((todo)=>{
            return(
              <Todo key={todo} item={todo}/>
            )
          })
        }
      </ul>
        </div>
    )
}

export default Main


