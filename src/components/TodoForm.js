import React, { useState, useEffect, useRef } from 'react'

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);
    const availableClasses = [
        "todo-row blue", 
        "todo-row orange", 
        "todo-row pink", 
        "todo-row purple",
        "todo-row red"
    ];
    const [classSelector, setClassSelector] = useState(props.edit.class + " color-select-div");

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

        if(props.edit.id){
            props.onSubmit({
                id: Math.floor(Math.random() * 100000),
                text: input,
                list: props.edit.list,
                class: classSelector.slice(0, -17)
            });
        }
        else{
            props.onSubmit({
                id: Math.floor(Math.random() * 100000),
                text: input,
                list: "todo",
                class: availableClasses[Math.floor(Math.random() * availableClasses.length)]
            });
        }

        setInput('');

    };


    const changeClassColor = e => {
        setClassSelector(availableClasses[(availableClasses.indexOf(e.target.className.slice(0, -17)) + 1) % availableClasses.length ] + " color-select-div");
    }


    return (
        <form className="todo-form" onSubmit={handleSubmit}>
        {props.edit.id ? (
            <div>
                <input 
                    type="text" 
                    placeholder="Update your todo" 
                    value={input}
                    className="todo-input"
                    onChange={handleChange}
                    ref={inputRef}
                />
                <button className="todo-button edit">Update</button>
                <div className={classSelector} onClick={(e) => changeClassColor(e)}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Color
                </div>
            </div>
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
