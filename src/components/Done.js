import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import { MdArrowBack } from 'react-icons/md'
import { Tooltip } from '@material-ui/core'

function Done({todos, removeTodo, updateTodo, sendToDo, handleDrag, handlePositionChange, allowDrop, setShowDelete}) {
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        todoList: false,
        doing: false,
        done: true,
    })

    const submitUpdate = value =>{
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: '',
            todoList: false,
            doing: false,
            done: true,
        })
    }

    if(edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    return todos.map((todo, index) => todo.done ? (
        <div className={'todo-row'} 
            key={index} 
            draggable={true} 
            onDragStart={(e) => handleDrag(e, JSON.stringify(todo))} 
            onDragEnd={() => setShowDelete(false)}
            onDrop={(e) => handlePositionChange(e, todo)} 
            onDragOver={(e) => allowDrop(e)} 
            onDoubleClick={() => setEdit({ id: todo.id, value: todo.text, todoList:false, doing:false, done:true })}
        >
            <div key={todo.id}>
                {todo.text}
            </div>
            <div className="icons">
                <Tooltip title='Edit Text' placement='top' arrow>
                    <span>
                        <TiEdit 
                            onClick={() => setEdit({ id: todo.id, value: todo.text, todoList:false, doing:false, done:true })}
                            className='edit-icon'
                        />
                    </span>
                </Tooltip>

                <Tooltip title="Send to To-Do's" placement='top' arrow>
                    <span>
                        <MdArrowBack
                            onClick={() => sendToDo(todo.id)}
                        />
                    </span>
                </Tooltip>

                <Tooltip title='Delete To-do' placement='top' arrow>
                    <span>
                        <RiDeleteBin5Line 
                            onClick={() => removeTodo(todo.id)}
                        />
                    </span>
                </Tooltip>

            </div>
        </div>
    ) : null )
}

export default Done
