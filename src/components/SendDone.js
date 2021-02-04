import React from 'react'
import Done from './Done'

function SendDone({todos, deleteAllDone, removeTodo, updateTodo, sendToDo, sendToDoing, sendToDone, handleDrag}) {

    return [...todos].filter(todo => todo.done).length < 2 ? (
        <>
            <h2>Done !!!</h2>
            <Done todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} sendToDo={sendToDo} sendToDoing={sendToDoing} sendToDone={sendToDone} handleDrag={handleDrag} />
        </>
    ) : (
        <>
            <h2>Done !!!</h2>
            <Done todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} sendToDo={sendToDo} sendToDoing={sendToDoing} sendToDone={sendToDone} handleDrag={handleDrag} />
            <button className="delete-all-button" onClick={deleteAllDone}>Delete Done</button>
        </>
    )
}

export default SendDone
