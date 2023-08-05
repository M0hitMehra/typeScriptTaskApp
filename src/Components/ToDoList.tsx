import React from 'react'
import { ToDo } from '../modal'
import Task from './Task'
import "./style.css"
import { Droppable } from 'react-beautiful-dnd'

interface Props {
    tasks: ToDo[],
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>,
    setCompletedTodos: React.Dispatch<React.SetStateAction<ToDo[]>>,
    completedTodos: ToDo[]
}
const ToDoList: React.FC<Props> = ({ tasks, setTodos, completedTodos, setCompletedTodos }) => {
    return (
        <div className="container">
            <Droppable droppableId='TodosList'>
                {(provided) => (
                    <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
                        <span className='todosHeading'>Active Tasks</span>
                        <div className='tasks'>
                            {
                                tasks.map((task, index) => (
                                    <Task index={index} task={task} key={task.id} tasks={tasks} setTodos={setTodos} />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    </div>)}
            </Droppable>

            <Droppable droppableId='TodosRemove' >
                {(provided) => (<div className='todos remove' ref={provided.innerRef} {...provided.droppableProps} >
                    <span className='todosHeading'>Completed Tasks</span>
                    <div className='tasks'>
                        {
                            completedTodos.map((task, index) => (
                                <Task task={task} index={index} key={task.id} tasks={completedTodos} setTodos={setCompletedTodos} />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                </div>)}
            </Droppable>
        </div>
    )
}

export default ToDoList