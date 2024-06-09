import { useState } from 'react' 
import './App.css'
import { Todo } from './components/Todo/Todo';
import { TodoForm } from './components/TodoForm/TodoForm'
import {v4 as uuidv4} from 'uuid';
import { Search } from './components/Search/Search';
import Filter from './components/Filter/Filter';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false
    },
    {
      id: 2,
      text: "Treinar",
      category: "Pessoal",
      isCompleted: false,
    },
  ]);

  const [search, setSearch] = useState("");
  
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc")

  const addTodo = ((text: string, category: string) => {
    const newID = Number(uuidv4())
    const newTodos = [
      ...todos,
      {
        id: newID,
        text,
        category,
        isCompleted: false
      },
    ];

    setTodos(newTodos)
  })

  const removeTodo = ((id: number) => {
    const newTodos = [...todos]
    const filterTodos = newTodos.filter((todo) => todo.id !== id ? todo : null);
    setTodos(filterTodos);
  })

  const completeTodo = ((id: number) => {
    const newTodos = [...todos];
    newTodos.map((todo) => 
      todo.id === id ? todo.isCompleted = !todo.isCompleted : todo);
    setTodos(newTodos)
  })

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch}/>
      <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
      <div className="todo-list">
        {todos
        .filter((todo) => filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
        .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
        .map((todo) => (
          <Todo {...todo} key = {todo.id} removeTodo={removeTodo} completeTodo={completeTodo}/>
        ))}
      </div>
      <TodoForm addTodo = {addTodo}/>
    </div>
  )
}

export default App
