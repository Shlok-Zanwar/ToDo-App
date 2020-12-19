import './App.css';
// import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  document.title = "To-do's Shlok Zanwar"

  return (
    <>
    <div>
    <h1>To-Do App - Shlok Zanwar</h1>
      <TodoList />
    </div>
    </>
  );
}

export default App;
