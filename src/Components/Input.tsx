import React, { useRef } from 'react'
import "./style.css"

interface Props {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void
}

const Input: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <form className='input' onSubmit={(e) => {
            // e.preventDefault()
            handleAdd(e)
            inputRef.current?.blur()
        }} >
            <input ref={inputRef} value={todo} onChange={(e) => setTodo(e.target.value)} type="input" name="" id="" className='input__task' placeholder='Enter a task' />
            <button className='input__submit' type='submit'>GO</button>
        </form>
    )
}

export default Input