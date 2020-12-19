import React, { useState } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import { MdDoneAll } from 'react-icons/md'
import { FiSend } from 'react-icons/fi'

function Todo({todos, removeTodo, updateTodo, sendToDo , sendToDoing, sendToDone}) {
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        todoList: true,
        doing: false,
        done:false,
    })

    const submitUpdate = value =>{
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: '',
            todoList: true,
            doing: false,
            done:false,
        })
    }

    if(edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate}/>
    }

    return todos.map((todo, index) => todo.todoList ? (
            <div className={'todo-row'} key={index} >
                <div key={todo.id}>
                    {todo.text}
                </div>
                <div className="icons">
                    <TiEdit 
                        onClick={() => setEdit({ id: todo.id, value: todo.text, todoList:true, doing:false, done:false })}
                        className='edit-icon'
                    />
                    <FiSend
                        onClick={() => sendToDoing(todo.id)}
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

export default Todo
