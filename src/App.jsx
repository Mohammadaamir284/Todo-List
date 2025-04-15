import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import Navbar from "./com/Navbar"
import Up from "./com/Up"


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFnish, setshowfnish] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
    
  },[])

  const saveTodo =() => {

    localStorage.setItem("todos", JSON.stringify(todos))
  }

 const finish =()=>{
  setshowfnish(!showFnish)

 }

  const add = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    saveTodo()

  }

  const edit = (todo, id) => {
    const toEdit = todos.find(item => item.id === id);
    settodo(toEdit.todo);
    settodos(todos.filter(item => item.id !== id));
    saveTodo()

  }

  const del = (e, id) => {

   
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newtodos)
    saveTodo()

    console.log(newtodos)

  }
  const change = (e) => {
    settodo(e.target.value)
    saveTodo()


  }
  const checkbox = (e) => {
    let id = e.target.name;
    console.log("i am id ", id)
    let index = todos.findIndex(item => {
      return item.id === id
    });
    console.log("i am index ", index)
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    settodos(newTodos);
    saveTodo()

  }



  return (
    <div className="bg-stone-300 h-[100vh]">
      <Navbar />

      <div className="  m-auto mt-5 md:mt-10 md:h-138 h-[90vh] bg-black text-white rounded-xl  container w-full md:w-100  ">
        <div className="up bg-violet-600 rounded-t-xl"><Up /></div>
        <div className="in flex items-center justify-center gap-4  m-5">
          <input onChange={change} value={todo} className="w-80 bg-slate-500 rounded-lg p-1" type="text" />
          <button onClick={add} disabled={todo.length<=3} className="cursor-pointer  bg-violet-700 hover:font-bold hover:bg-violet-900   w-14 px-2 p-1 rounded-lg">ADD</button>
        </div>
        <hr />
        <input className="m-2" onChange={finish} type="checkbox" checked={showFnish} /> Show Finished
        <hr />
        <div className=" overflow-auto md:h-105 h-[75vh]">

          {todos.length === 0 && <div className="m-5 text-center">No Todos To Display</div>}
          {todos.map(item => {
            return (showFnish || item.iscompleted) && <div key={item.id} className="down flex justify-between m-2 items-center ">

              <div className="flex gap-4  w-62">
                <input onChange={checkbox} name={item.id} checked={item.iscompleted} type="checkbox" />
                <div className="break-words break-all text-wrap">
                  <div className={item.iscompleted ? "line-through" : ""}>{item.todo} </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={(e) => edit(e, item.id)} className="cursor-pointer  bg-violet-700 w-fit px-2 rounded-md">Edit</button>
                <button onClick={(e) => del(e, item.id)} className="cursor-pointer  bg-violet-700 px-2  w-fit rounded-md">Delete</button>
              </div>

            </div>
          })}
        </div>

      </div>

    </div>
  )
}

export default App
