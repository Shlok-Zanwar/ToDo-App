import React, { useState } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import { MdDoneAll } from 'react-icons/md'
import { FiSend } from 'react-icons/fi'
import { MdArrowBack } from 'react-icons/md'

function Doing({todos, removeTodo, updateTodo, sendToDo, sendToDoing, sendToDone}) {
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        todoList: false,
        doing: true,
        done:false,
    })

    const submitUpdate = value =>{
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: '',
            todoList: false,
            doing: true,
            done:false,
        })
    }

    if(edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    return todos.map((todo, index) => todo.doing ? (
            <div className={'todo-row'} key={index} >
                <div key={todo.id}>
                    {todo.text}
                </div>
                <div className="icons">
                    <TiEdit 
                        onClick={() => setEdit({ id: todo.id, value: todo.text, todoList:false, doing:true, done:false })}
                        className='edit-icon'
                    />
                    <MdArrowBack
                        onClick={() => sendToDo(todo.id)}
                    />
                    <MdDoneAll
                        onClick={() => sendToDone(todo.id)}
                    />
                    {/* <RiDeleteBin5Line 
                        onClick={() => removeTodo(todo.id)}
                        
                    /> */}
                </div>
            </div>
    ) : null )
}

export default Doing
