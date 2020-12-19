import React from 'react'
import Done from './Done'

function SendDone({todos, deleteAllDone, removeTodo, updateTodo, sendToDo, sendToDoing, sendToDone}) {

    return [...todos].filter(todo => todo.done).length < 2 ? (
        <div className="todo-app">
            <h2>Done !!!</h2>
            <Done todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} sendToDo={sendToDo} sendToDoing={sendToDoing} sendToDone={sendToDone} />
        </div>
    ) : (
        <div className="todo-app">
            <h2>Done !!!</h2>
            <Done todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} sendToDo={sendToDo} sendToDoing={sendToDoing} sendToDone={sendToDone} />
            <button className="delete-all-button" onClick={deleteAllDone}>Delete Done</button>
        </div>
    )
}

export default SendDone
