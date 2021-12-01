import React, { useState } from 'react'
import db from './firebase';
import Modal from 'react-modal';
Modal.setAppElement("#root")
function Todo(props) {
    const [open, setopen] = useState(false);
    const [todoName, setTodoName] = useState("")
    const [todoDate, setTodoDate] = useState(); 
    const [todoTime, setTodoTime] = useState(); 
    const modalStyle={
        content: {
            top: '25%',
            left: '50%',
            right: 'auto',
            bottom: '55%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
          overlay:{
              position:"fixed",
              inset:"0px",
              backgroundColor:"#e0e0e0",
              opacity:"0.7",
          }
    }
    
    const updateTodo=(e)=>{
        db.collection("todos").doc(props.id).update({
            todo:todoName,
            date:todoDate,
            time:todoTime,
        },{merge:true})
        setopen(false)
    }

    const deleteTodo=(e)=>{
        db.collection("todos").doc(props.id).delete();
    }
    return (
        <>
        <Modal isOpen={open} onRequestClose={()=>setopen(false)} style={modalStyle}>
                    <h3>you can edit</h3>
                    <input type="text" value={todoName} onChange={(e)=>setTodoName(e.target.value)} placeholder={props.item}/>
                    <input type="date" onChange={(e) => {setTodoDate(e.target.value.split("T")[0]);}}/>
                    <input type="time" onChange={(e) => {setTodoTime(e.target.value.split("T")[0]);}}/>
                    <button id="modal-btn" onClick={updateTodo}>update</button>
        </Modal>
        <div>
            <li>
                {props.item}&nbsp;{props.date}&nbsp;{props.time}
                <button id="edit-btn" onClick={(e)=>setopen(true)}>edit</button>
                <button id="btn-delete" onClick={deleteTodo}>delete</button>
            </li>
        </div>
        </>
    )
}

export default Todo
