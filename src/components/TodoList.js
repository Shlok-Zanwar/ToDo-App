import React, {useState, useEffect} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'
import Doing from './Doing'
import SendDone from './SendDone';


function TodoList() {
    const [todos, setTodos] = useState( localStorage.getItem('savedTodos') ? JSON.parse(localStorage.getItem('savedTodos')) : []);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        // Saving data to local storage every time Todos are updated
        localStorage.setItem('savedTodos', JSON.stringify(todos))
    }, [todos])


    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [...todos, todo];
        setTodos(newTodos)
    }
    

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }


    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id);

        // For setting todo, Cause useState hook normally not working for functions
        setTodos(a => {
            return setTodos(removeArr);
        })
    }

    const sendToDo = id =>{
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.todoList = true;
                todo.doing = false;
                todo.done = false;
            }
            return todo;
        })
        setTodos(updatedTodos)
    }

    const sendToDoing = id =>{
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.todoList = false;
                todo.doing = true;
                todo.done = false;
            }
            return todo;
        })
        setTodos(updatedTodos)
    }
    
    const sendToDone = id =>{
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.todoList = false;
                todo.doing = false;
                todo.done = true;
            }
            return todo;
        })
        setTodos(updatedTodos)
    }

    const deleteAllDone = () => {
        let updatedTodos = [...todos].filter(todo => !todo.done)
        setTodos(updatedTodos)
    }

    const handleDrag = (e, todo) => {
        e.dataTransfer.setData("todo", todo);
        setShowDelete(true);
    }


    const handleToDoDrop = e => {
        let id = JSON.parse(e.dataTransfer.getData("todo")).id;
        sendToDo(id);
        setShowDelete(false);
    }


    const handleDoingDrop = e => {
        let id = JSON.parse(e.dataTransfer.getData("todo")).id;
        sendToDoing((id));
        setShowDelete(false);
    }


    const handleDoneDrop = e => {
        let id = JSON.parse(e.dataTransfer.getData("todo")).id;
        sendToDone((id));
        setShowDelete(false);
    }


    const handlePositionChange = (e, onTodo) => {
        var changeTodo = JSON.parse(e.dataTransfer.getData("todo"));
        changeTodo.todoList = onTodo.todoList;
        changeTodo.doing = onTodo.doing;
        changeTodo.done = onTodo.done;

        const newTodos = [];
        var i;
        for(i = 0; i < todos.length; i ++){
            
            if(todos[i].id !== changeTodo.id){
                newTodos.push(todos[i]);
            }
            if(todos[i].id === onTodo.id){
                newTodos.push(changeTodo);
            }
        }
        setShowDelete(false);
        // For setting todo, Cause useState hook normally not working for functions
        setTodos(prev => {
            return setTodos(newTodos);
        });
    }
    

    const allowDrop = (e) => {
        e.preventDefault();
    }

    return (
        <>
        <div className="todo-app" onDrop={(e) => handleToDoDrop(e)} onDragOver={(e) => allowDrop(e)}>
            <h2>To Do's</h2>
            <TodoForm onSubmit={addTodo}/>
            <Todo 
                todos={todos} 
                updateTodo={updateTodo} 
                sendToDoing={sendToDoing} 
                sendToDone={sendToDone} 
                handleDrag={handleDrag} 
                handlePositionChange={handlePositionChange} 
                allowDrop={allowDrop} 
                setShowDelete={setShowDelete}
            />
        </div>

        <div className="todo-app" onDrop={(e) => handleDoingDrop(e)} onDragOver={(e) => allowDrop(e)} >
            <h2>Doing ....</h2>
            <Doing 
                todos={todos} 
                updateTodo={updateTodo} 
                sendToDo={sendToDo} 
                sendToDone={sendToDone} 
                handleDrag={handleDrag}
                handlePositionChange={handlePositionChange} 
                allowDrop={allowDrop} 
                setShowDelete={setShowDelete}
            />
        </div>

        <div className="todo-app extra-padding" onDrop={(e) => handleDoneDrop(e)} onDragOver={(e) => allowDrop(e)}>
            <SendDone 
                todos={todos} 
                removeTodo={removeTodo} 
                updateTodo={updateTodo} 
                sendToDo={sendToDo} 
                handleDrag={handleDrag} 
                handlePositionChange={handlePositionChange} 
                allowDrop={allowDrop}
                deleteAllDone={deleteAllDone}  
                showDelete={showDelete} 
                setShowDelete={setShowDelete}
            />
        </div>
        </>
    )

}

export default TodoList
