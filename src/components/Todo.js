import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { TiEdit } from 'react-icons/ti'
import { MdDoneAll } from 'react-icons/md'
import { FiSend } from 'react-icons/fi'
import { Tooltip } from '@material-ui/core'

function Todo({todos, updateTodo, sendToDoing, sendToDone, handleDrag, handlePositionChange, allowDrop, setShowDelete}) {
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        list: "todo",
        class: ""
    })

    const submitUpdate = value =>{
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: '',
            list: "todo",
            class: ""
        })
    }

    if(edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate}/>
    }

    return todos.map((todo, index) => todo.list === "todo" ? (
        <div className={todo.class}
            key={index} 
            draggable={true} 
            onDragStart={(e) => handleDrag(e, JSON.stringify(todo))} 
            onDragEnd={() => setShowDelete(false)}
            onDrop={(e) => handlePositionChange(e, todo)} 
            onDragOver={(e) => allowDrop(e)} 
            onDoubleClick={() => setEdit({ id: todo.id, value: todo.text, list: "todo", class:todo.class })}
        >
            <div key={todo.id}>
                {todo.text}
            </div>
            <div className="icons">
                <Tooltip title='Edit Text' placement='top' arrow>
                    <span>
                        <TiEdit 
                            onClick={() => setEdit({ id: todo.id, value: todo.text, list: "todo", class:todo.class })}
                            className='edit-icon'
                        />
                    </span>
                </Tooltip>

                <Tooltip title='Send to Doing' placement='top' arrow>
                    <span>
                        <FiSend
                            onClick={() => sendToDoing(todo.id)}
                        />
                    </span>
                </Tooltip>

                <Tooltip title='Send to Done' placement='top' arrow>
                    <span>
                        <MdDoneAll
                            onClick={() => sendToDone(todo.id)}
                        />
                    </span>
                </Tooltip>

            </div>
        </div>
    ) : null )
}

export default Todo
