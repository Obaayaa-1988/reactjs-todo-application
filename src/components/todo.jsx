
import React, { useState } from 'react'
import './todo.css';

export default function Todo({ duty, deleteTodo, update }) {
  const [check, setCheck] = useState(false)



  return (

    <div className='wrapper'>
      <div className='todo-wrapper'  style={ duty.status === "Pending" ? { backgroundColor: "white"} : {backgroundColor: "rgb(95,158,160)"}}>
        <div className='myduty'>
        <div className='check' style={!check ? { textDecoration: "none" } : { textDecorationLine: 'line-through', textDecorationStyle: "solid" }}>
          <input className='wrapper-input' type="checkbox" value="checks" checked={check} onChange={() => setCheck(!check)} onClick={() => update(duty.id)} />
          <p>{duty.todo}</p>
        </div>

        </div>

        <div>
          <button className='todo-btn1' onClick={() => update(duty._id)}>{duty.status}</button>
          <button className='todo-btn2' onClick={() => deleteTodo(duty._id)}>Delete</button>
        </div>

      </div>

    </div>
  )
}
