import React from 'react'

function DeleteButton({todos, deleteAllDone, allowDrop, removeTodo, showDelete}) {
    
    return [...todos].filter(todo => todo.done).length > 1 || showDelete ? (
        <button 
            className="delete-all-button" 
            onClick={deleteAllDone} 
            onDragOver={(e) => allowDrop(e)} 
            onDrop={(e) => removeTodo(JSON.parse(e.dataTransfer.getData("todo")).id)} 
        >
            Delete Done
        </button>
    ) : null
}

export default DeleteButton
