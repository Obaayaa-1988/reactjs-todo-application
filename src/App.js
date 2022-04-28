
import { useEffect, useState } from 'react';
import axios from 'axios';
//import { Link, Outlet } from 'react-router-dom';
import './App.css';
import Todos from './components/todos';
import {  useNavigate } from 'react-router-dom'





//App.js is our central point where we will put all our data and also the new incoming input input field where value or written t
//todo from users will be added
//todos= all combined single todo which is imported into app.js
//todo= single input from userds with id which is iimported into todos.jsx
//to pass data from central pont app.js(parent) to child(todos) through prop
//to pass data to grandchild(todo) must first be passed to mother(todos) before prop drilling to todo to get access to it
function App() {
  const [input, setInput] = useState("")
  const [completed, setCompleted] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingg, setLoadingg] = useState(false)
 //const [ user, setUser] = useState(null)
 const history = useNavigate();
  

   const logout = async () => {
    try {
      
      const response = await axios.get("http://localhost:8080/logout", {
      },

      { withCredentials: true }  

      );

      const { data } = response;
      console.log(data)
      if(data) {
        history("/", {replace: true})
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }



  //todos= could be any name, central pont for our data
  //this contains a bulk of all todos
  //this is set to a state and aa  prop(task) is the bulk(array of all todos) is created which is then pass into the todos.jsx to 
  //be map through to target each todo and it prop also passed into the todo.jsx as (duty)
  //const todos using dummy data and can later be useState('')
  const [todos, setTodos] = useState([
    /* {
       id:1,
       todo: "visit a friend",
       status: "Pending"
     },
     {
       id:2,
       todo: "go to the grocery store",
       status: "Done"
     },
     {
       id:3,
       todo: "Buy a car",
       status: "Pending"
     },
 
     {
       id:4,
       todo: "Cash a cheque",
       status: "Pending"
     }
 */

  ])

  //adding a todo to the database
  //you cnnect this function to the backend save/post todo
  //url link api/todos using axios
  //you have to make sure the frontend url is the same as the backend url
  //
//saving todo and fetching that todo the same time
//you have to make sure the url used at the backend matches with the fronend too

//adding a todo to the application the backend has been structured to connect with the frontend using axios
//and the localhost of the backend along with the crud operation url of the backend(the url must match with the frontend url)
     const addTodo = async () => {
       try {
         setLoading(true)
         const add = await axios.post(`http://localhost:8080/api/todos`, {
           todo: input
         },
         { withCredentials: true } 
         
         
         );
         console.log(add.data)

        

         setInput("");
         setLoading(false)

         
       } catch (error) {
         console.log(error)
         
       }
      
      };


      //deleting a todo from the databse

  const deleteTodo = async (id) => {
    try{
      setLoading(true)

    const todo = await axios.delete(`http://localhost:8080/api/todo/${id}`,
    { withCredentials: true } 
    
    )
    
    console.log(todo);

    setLoading(false)

  } catch(error) {
    console.log(error)
  }
  }

  //updating a todo in the database in this case we will use the if statement

  const update = async (id) => {
    try {
      setLoadingg(true)
      const todo = await axios.get(`http://localhost:8080/api/todo/${id}`,
      { withCredentials: true } 
      
      );
      const { data } = todo;

      if(data.status === 'pending') {
        await axios.put(`http://localhost:8080/api/todo/${data._id}`, {

        status: "done"

        },
        { withCredentials: true } 
        
        );

      } else {
        await axios.put(`http://localhost:8080/api/todo/${data._id}`, {
          status: "pending"

        },

        { withCredentials: true } 
        
        );
      }
      setLoadingg(false)
      
    } catch (error) {
      console.log(error)
      
    }
  }



//using useeffect to fire a function when a component renders
//fetching a todo back from the database(backend) we use the useeffect hook so immediately the todo saves to the database
//it fetch and display it for the user.

      useEffect(() => {
        const fetchTodos = async () => {
          const todos = await axios.get(`http://localhost:8080/api/todos`,
          { withCredentials: true } 
          
          );
          console.log("heyyy", todos)

          const { data } = todos;

          setTodos(data)
        };
        fetchTodos();

      }, [ loading, loadingg]);

  
  //completed todos
   const getCompleted = (arg) => {
     const done = todos.filter(todo => {
       return todo.status === arg
     })

    setCompleted(done.length)
   }

   useEffect(() => {
     getCompleted('Done')
    console.log(completed)
   }, [todos, completed])

  // //adding new todo to the already todos or if it is cleared list
  //   const addTodo = () => {
  //     const newTodo = {
  //       id: todos.length + 1,
  //       todo: input,
  //       status: "Pending"

  //     }
  //     setTodos([...todos, newTodo])
  //     setInput('')
  //    //setinput('')to clear input field after typing


  //  }

  // //updating a todo from pending to done to pending
  //  const update = (id) => {
  //    const mapped = todos.map(item => {
  //      return item.id === id ? { ...item, status: item.status === "Pending" ? "Done" : "Pending" } : { ...item }
  //    })
  //    setTodos([...mapped])
  // }

  // //checkbox 

  // //deleting a todo using filter(array method, spread operator allow us to be able to edit the array) to get a partiuclar id/todo that mactches the todo id clicked
  //  const deleteTodo = (id) => {
  //    const remainTodo = todos.filter(todo => todo.id !== id)
  //    setTodos([...remainTodo])
  //  }

  //setTodos is use when you want to change the state of the todo


  return (

    <div>
      
      <button className='btn1' onClick={logout}>logout</button> 
     

      {/* <nav className='minibar'>
        <Link to="/todoLogin">TodoLogin</Link>
        <Link to="/todoRegister">TodoRegister</Link> {''}
       
        </nav>
       <Outlet /> */}


    <div className="my-app">
      <h1>TO DO APP</h1>
      <hr/>

      <div>
        <input type="text" className='my-input' placeholder='add a todo....' value={ input } onChange={(e) => setInput(e.target.value)} />
      

        <button  className='todo-button' disabled={!input} onClick={addTodo}>Add a Todo</button>
      </div>

      {loading && (
         <div style={{color: "red", fontSize: "2rem", textAlign: "center"}}>data is loading....</div>
         
       )}

       <p style={{ textAlign: "center" }}>  {completed} { completed > 1 ? "tasks": "task"} completed of {todos.length}</p>

      
      
        {/* <Todos tasks={todos} deleteTodo={deleteTodo} />   */}

         <Todos tasks={todos} deleteTodo={deleteTodo} update={update}  />  

    </div>

    </div>
  );
}

export default App;
