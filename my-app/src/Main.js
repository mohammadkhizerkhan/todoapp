import './App.css';
import { useEffect, useState } from 'react';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase/app'

import React from 'react'

function Main() {
    const [todoName, setTodoName] = useState(""); 
    const [todoDate, setTodoDate] = useState(); 
    const [todoTime, setTodoTime] = useState(); 
    
    const [todos, settodos] = useState([{
      id:"abc",
      todo:"xyz",
      date:"2021-12-10",
      time:"18:33",
    }]);
    // when the app loads we need to listen the db and fetch new todo when added/deleted with the help of useeffect
  
    useEffect(() => {
      // this code runs when app loads
      db.collection("todos").orderBy('timestamp','desc').onSnapshot(snapshot=>{
        // console.log(snapshot.docs.map(doc=>({id:doc.id,...doc.data()})))
        // here we are capturing whatever changes happen in db using onSnapshot
        // after capturing we are setting our todos by taking from firebase to show in view or to do operate in local program 
        settodos(snapshot.docs.map(doc=>({id:doc.id,...doc.data()})))
      })
    }, [])
    
    const addtodos=(e)=>{
      e.preventDefault();
      db.collection("todos").add({
        // this json.stringify is important
        todo:todoName,
        date:todoDate,
        time:todoTime,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      setTodoName("")//clear input field after clicking the button
      // console.log(todos)
    }
    return (
        <div>
            <form action="">
            <input
        type="text"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
      />
      <input
        type="date"
        onChange={(e) => {
          setTodoDate(e.target.value.split("T")[0]);
        }}
      />
      <input
        type="time"
        onChange={(e) => {
          setTodoTime(e.target.value.split("T")[0]);
        }}
      />
     
      <button id="btn" type="submit" disabled={!todoName} onClick={addtodos}>add</button>
      </form>
      <ul>
        {
          todos.map((doc)=>{
            return(
              <Todo key={doc.todo} item={doc.todo} date={doc.date} time={doc.time} id={doc.id}/>
            )
          })
        }
      </ul>
        </div>
    )
}

export default Main


