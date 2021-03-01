import React, {useState, useEffect} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'
import Doing from './Doing'
import DeleteButton from './DeleteButton';
import Done from './Done';


function TodoList() {
    const [todos, setTodos] = useState( localStorage.getItem('savedTodos') ? JSON.parse(localStorage.getItem('savedTodos')) : []);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        // Saving data to local storage every time Todos are updated
        localStorage.setItem('savedTodos', JSON.stringify(todos))
    }, [todos])


    // Preventing previously created todos from getting destroyed after update
    useEffect(() => {
        if(localStorage.getItem('update_version') !== "v1"){

            const availableClasses = [
                "todo-row blue", 
                "todo-row orange", 
                "todo-row pink", 
                "todo-row purple",
                "todo-row red"
            ];
            var newTodos = [];
            var todoType = "";

            todos.map(todo => {
                if(todo.todoList){
                    todoType = "todo";
                }
                else if (todo.doing){
                    todoType = "doing";
                }
                else{
                    todoType = "done";
                }

                var updateTodo = {
                    id: todo.id,
                    text: todo.text,
                    list: todoType,
                    class: availableClasses[Math.floor(Math.random() * availableClasses.length)]
                }
                newTodos.push(updateTodo);
            });
            alert(newTodos);
            setTodos(newTodos);
            localStorage.setItem("update_version", "v1"); 
        }
    }, [])


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
                todo.list = "todo";
            }
            return todo;
        })
        setTodos(updatedTodos)
    }

    const sendToDoing = id =>{
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.list = "doing";
            }
            return todo;
        })
        setTodos(updatedTodos)
    }
    
    const sendToDone = id =>{
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.list = "done";
            }
            return todo;
        })
        setTodos(updatedTodos)
    }

    const deleteAllDone = () => {
        let updatedTodos = [...todos].filter(todo => todo.list !== "done")
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
        changeTodo.list = onTodo.list;

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
            <TodoForm onSubmit={addTodo} edit={{class: "todo-row blue"}} newTodo={true}/>
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
            <DeleteButton 
                todos={todos}
                deleteAllDone={deleteAllDone} 
                allowDrop={allowDrop} 
                removeTodo={removeTodo} 
                showDelete={showDelete} 
            />
        </div>
        </>
    )

}

export default TodoList
