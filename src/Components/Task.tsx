import React, { useRef, useState, useEffect } from "react";
import { ToDo } from "../modal";
import { MdOutlineDone, MdDoneAll } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import "./style.css"
import { Draggable } from "react-beautiful-dnd";


interface Props {
  task: ToDo;
  tasks: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  index: number,
}

const Task: React.FC<Props> = ({ task, tasks, setTodos, index }) => {

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [edit, setEdit] = useState<string>(task.todo)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    setTodos(tasks.map(task => task.id === id ? { ...task, todo: edit } : task))
    setOpenEdit(false)
  }

  const handleDelete = (id: number) => {
    let arr = tasks.filter(task => task.id !== id);
    setTodos(arr)
  }
  const handleDone = (id: number) => {
    setTodos(tasks.map(task => task.id === id ? { ...task, isDone: !task.isDone } : task))
    // console.log("task" , task)
    // let active = tasks.filter(task => {if(task.isDone === false) return task} )
    // let completed = tasks.filter(task => {if(task.isDone === true) return task} )
    // setTodos(active)
    // console.log("active " , active)
    // console.log("completed " ,completed)
  }
  useEffect(() => {
    inputRef.current?.focus()
  }, [openEdit])

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {
        (provided) => (
          <form className="task" onSubmit={(e) => handleEdit(e, task.id)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {
              openEdit ? (
                <input type="text" ref={inputRef} value={edit} onChange={(e) => { setEdit(e.target.value) }} />
              ) : (
                task.isDone ? (
                  <s className="task__text">{task.todo}</s>
                ) : (
                  <span className="task__text">{task.todo}</span>
                )
              )
            }
            <div className="icons">
              <span className="icon" onClick={() => {
                if (!openEdit && !task.isDone) {
                  setOpenEdit(!openEdit);
                  // inputRef.current?.focus()
                } else {
                  setOpenEdit(false);
                  setEdit(task.todo);
                }
              }}>
                <BiSolidEdit />
              </span>
              <span className="icon" onClick={() => handleDelete(task.id)}>
                <AiFillDelete />
              </span>
              <span className="icon" onClick={() =>{ handleDone(task.id)}}>
                {!task.isDone ? (<MdOutlineDone />) : (<MdDoneAll />)}
              </span>
            </div>
          </form>
        )
      }

    </Draggable>

  );
};

export default Task;

  //   <Draggable draggableId={task.id.toString()} index={index} >

  //     {
  //       (provided) => {
  //         <form className="task" onSubmit={(e) => handleEdit(e, task.id)} ref={provided.innerRef} {...provided.dragHandleProps} >

  //           {
  //             openEdit ? (
  //               <input type="text" ref={inputRef} value={edit} onChange={(e) => { setEdit(e.target.value) }} />
  //             ) : (

  //               task.isDone ? (
  //                 <s className="task__text">{task.todo}</s>

  //               ) : (

  //                 <span className="task__text">{task.todo}</span>
  //               )

  //             )
  //           }


  //           <div>
  //             <span className="icon" onClick={() => {
  //               if (!openEdit && !task.isDone) {
  //                 setOpenEdit(!openEdit);
  //                 // inputRef.current?.focus()
  //               } else {
  //                 setOpenEdit(false)
  //                 setEdit(task.todo)
  //               }
  //             }} >
  //               <BiSolidEdit />
  //             </span>
  //             <span className="icon" onClick={() => handleDelete(task.id)} >
  //               <AiFillDelete />
  //             </span>
  //             <span className="icon" onClick={() => handleDone(task.id)} >
  //               {!task.isDone ? (<MdOutlineDone />) : (<MdDoneAll />)}
  //             </span>
  //           </div>
  //         </form>
  //       }
  //  }
  //   </Draggable>