import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { TiEdit } from 'react-icons/ti'
import { MdDoneAll } from 'react-icons/md'
import { MdArrowBack } from 'react-icons/md'
import { Tooltip } from '@material-ui/core'

function Doing({todos, updateTodo, sendToDo, sendToDone, handleDrag, handlePositionChange, allowDrop, setShowDelete}) {
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
        <div className={'todo-row'} 
            key={index} 
            draggable={true} 
            onDragStart={(e) => handleDrag(e, JSON.stringify(todo))} 
            onDragEnd={() => setShowDelete(false)}
            onDrop={(e) => handlePositionChange(e, todo)} 
            onDragOver={(e) => allowDrop(e)} 
        >
            <div key={todo.id}>
                {todo.text}
            </div>
            <div className="icons">
                <Tooltip title='Edit Text' placement='top' arrow>
                    <span>
                        <TiEdit 
                            onClick={() => setEdit({ id: todo.id, value: todo.text, todoList:false, doing:true, done:false })}
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

export default Doing
