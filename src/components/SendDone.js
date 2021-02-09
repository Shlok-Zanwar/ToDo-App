import React from 'react'
import Done from './Done'

function SendDone({todos, removeTodo, updateTodo, sendToDo, handleDrag, handlePositionChange, allowDrop, deleteAllDone, showDelete, setShowDelete }) {

    return [...todos].filter(todo => todo.done).length > 1 || showDelete ? (
        <>
            <h2>Done !!!</h2>
            <Done 
                todos={todos} 
                removeTodo={removeTodo} 
                updateTodo={updateTodo} 
                sendToDo={sendToDo} 
                handleDrag={handleDrag} 
                handlePositionChange={handlePositionChange} 
                allowDrop={allowDrop} 
                setShowDelete={setShowDelete}
            />
            <button 
                className="delete-all-button" 
                onClick={deleteAllDone} 
                onDragOver={(e) => allowDrop(e)} 
                onDrop={(e) => removeTodo(JSON.parse(e.dataTransfer.getData("todo")).id)} 
            >
                Delete Done
            </button>
        </>
    ) : (
        <>
            <h2>Done !!!</h2>
            <Done 
                todos={todos} 
                removeTodo={removeTodo} 
                updateTodo={updateTodo} 
                sendToDo={sendToDo} 
                handleDrag={handleDrag} 
                handlePositionChange={handlePositionChange} 
                allowDrop={allowDrop} 
                setShowDelete={setShowDelete}
            />
            
        </>
    )
}

export default SendDone
