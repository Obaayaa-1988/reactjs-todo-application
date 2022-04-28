import React from 'react'
import Todo from './todo'
//todos prop= todos (settodos)
export default function Todos( { tasks, deleteTodo, update}) {
    // console.log(tasks)
    //the tasks.map allow us to loop through the array from the app.js todos list one by one
    //the singl array is then passed us again a prop into the todo.jsx part to display it 
    //if statement to display when there is no todo to show 
    if(tasks.length > 0){
        return (
            <div>
        
        
                {
                   
                    
                    tasks.map(todo => (
                        <Todo duty={todo} key={todo.id} deleteTodo={deleteTodo} update={update}/>
                    )
        
                    )
              
        
                 }
            </div>
          ) 
       
    } else{
        return<p style={{textAlign:"center"}}>No Todo To Display Yet</p>
    }

  
}
