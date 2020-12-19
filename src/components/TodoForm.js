import React, { useState, useEffect, useRef } from 'react'

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null)

    useEffect(() => {
        if(window.innerWidth >= 1350){
            inputRef.current.focus()
        }
    })

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if(props.edit){
            props.onSubmit({
                id: Math.floor(Math.random() * 100000),
                text: input,
                todoList: props.edit.todoList,
                doing: props.edit.doing,
                done: props.edit.done,
            });
        }
        else{
            props.onSubmit({
                id: Math.floor(Math.random() * 100000),
                text: input,
                todoList: true,
                doing: false,
                done: false,
            });
        }

        setInput('');

    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
        {props.edit ? (
            <>
            <input 
                type="text" 
                placeholder="Update your todo" 
                value={input}
                className="todo-input"
                onChange={handleChange}
                ref={inputRef}
            />
            <button className="todo-button edit">Update Todo</button>
            </>
            ) : (
            <>
            <input 
                type="text" 
                placeholder="Add a todo" 
                value={input}
                className="todo-input"
                onChange={handleChange}
                ref={inputRef}
            />
            <button className="todo-button">Add Todo</button>
            </>
        )}
            
        </form>
    )
}

export default TodoForm
