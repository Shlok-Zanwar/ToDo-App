import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { TiEdit } from 'react-icons/ti'
import { MdDoneAll } from 'react-icons/md'
import { FiSend } from 'react-icons/fi'
import { Tooltip } from '@material-ui/core'

function Todo({todos, removeTodo, updateTodo, sendToDo , sendToDoing, sendToDone, handleDrag}) {
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
            <div className={'todo-row'} key={index} draggable={true} onDragStart={(e) => handleDrag(e, todo.id)} >
                <div key={todo.id}>
                    {todo.text}
                </div>
                <div className="icons">
                    <Tooltip title='Edit Text' placement='top' arrow>
                        <span>
                            <TiEdit 
                                onClick={() => setEdit({ id: todo.id, value: todo.text, todoList:true, doing:false, done:false })}
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
