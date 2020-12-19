import React, {useState, useEffect} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'
import Doing from './Doing'
// import Done from './Done'
import SendDone from './SendDone';


function TodoList() {
    const [todos, setTodos] = useState( localStorage.getItem('savedTodos') ? JSON.parse(localStorage.getItem('savedTodos')) : [])

    window.addEventListener("storage", function () {
        setTodos(JSON.parse(localStorage.getItem('savedTodos')))
    }, false)

    const saveToLocalStorage = () => (
        localStorage.setItem('savedTodos', JSON.stringify(todos))
    )

    useEffect(() => {
        saveToLocalStorage();
        // getNumOfDone();
    }, [todos])


    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];
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

        setTodos(removeArr)
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

    return (
        <>
        <div className="todo-app">
            <h2>To Do's</h2>
            <TodoForm onSubmit={addTodo}/>
            <Todo todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} sendToDo={sendToDo} sendToDoing={sendToDoing} sendToDone={sendToDone} />
        </div>
        <div className="todo-app">
            <h2>Doing ....</h2>
            <Doing todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} sendToDo={sendToDo} sendToDoing={sendToDoing} sendToDone={sendToDone} />
        </div>
        <SendDone todos={todos} deleteAllDone={deleteAllDone} removeTodo={removeTodo} updateTodo={updateTodo} sendToDo={sendToDo} sendToDoing={sendToDoing} sendToDone={sendToDone}  />
        </>
    )

}

export default TodoList
