import React, { useEffect, useState } from 'react';
import './App.css';
import Input from './Components/Input';
import { ToDo } from './modal';
import ToDoList from './Components/ToDoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<ToDo[]>([])
  const [completedTodos, setCompletedTodos] = useState<ToDo[]>([])
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }
  }
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId) return
    let active = todos, completed = completedTodos, add
    // console.log(result)

    if(source.droppableId === "TodosList"){
      add = active[source.index]
      active.splice(source.index, 1)
    }else{
      add = completed[source.index]
      completed.splice(source.index, 1)
    }

    if(destination.droppableId === "TodosList"){
      add.isDone = false
       active.splice(destination.index, 0 ,add)
    }else{
      add.isDone = true
       completed.splice(destination.index, 0 ,add)
    }
setTodos(active)
setCompletedTodos(completed)
  }
  // useEffect(() => {
  //   console.log(todos)
  //   let arr = todos
  //   arr = arr.filter(a => a.isDone === true)
  // }, [todo])
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>TAS-KING</span>
        <Input todo={todo} handleAdd={handleAdd} setTodo={setTodo} />
        <ToDoList tasks={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;
