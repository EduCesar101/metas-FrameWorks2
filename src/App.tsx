import { useState } from 'react' 
import './App.css'
import { Todo } from './components/Todo/Todo';
import { TodoForm } from './components/TodoForm/TodoForm'
import { Search } from './components/Search/Search';
import Filter from './components/Filter/Filter';
import { Step } from './components/Step/Step';
import { StepForm } from './components/StepForm/StepForm';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Estudar React",
      category: "Estudos",
      finalDate: new Date('06-05-2024'),
      isCompleted: false
    },
    {
      id: 2,
      text: "Treinar",
      category: "Pessoal",
      finalDate: new Date('01-05-2024'),
      isCompleted: false,
    },
  ]);

  const [genTodoId, setGenTodoId] = useState(2);
  const [genStepId, setGenStepId] = useState(0);

  const [steps, setSteps] = useState([
    {
      id: 0,
      text: "",
      idTodo: 0,
      isCompleted: false
    }
  ]);

  const [search, setSearch] = useState("");
  
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc")

  const addTodo = ((text: string, category: string, finalDate: string) => {
    const newID = genTodoId + 1
    const newDate = new Date(finalDate)
    console.log(newID)
    const newTodos = [
      ...todos,
      {
        id: newID,
        text,
        category,
        finalDate: newDate,
        isCompleted: false
      },
    ];
    console.log(newTodos)
    setTodos(newTodos)
    setGenTodoId(newID)
  })

  const addStep = ((idTodo: number, text: string) => {
    const newID = genStepId + 1
    const newSteps = [
      ...steps,
      {
        id: newID,
        text: text,
        idTodo: idTodo,
        isCompleted: false
      },
    ];

    setSteps(newSteps);
    setGenStepId(newID);
    console.log(newSteps)
  })

  const removeStep = ((id: number) => {
    const newSteps = [...steps]
    const filterSteps = newSteps.filter((step) => step.id !== id ? step : null);
    setSteps(filterSteps);
  })

  const completeStep = ((id: number) => {
    const newSteps = [...steps];
    newSteps.map((step) => 
      step.id === id ? step.isCompleted = !step.isCompleted : step);
    setSteps(newSteps)
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
      <h1>Lista de Metas</h1>
      <Search search={search} setSearch={setSearch}/>
      <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
      <TodoForm addTodo = {addTodo}/>
      <div className="todo-list">
        {todos
        .filter((todo) => filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
        .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
        .map((todo) => (
          <div>
            <Todo {...todo} key = {todo.id} removeTodo={removeTodo} completeTodo={completeTodo}/>
            {steps.filter((step) => step.idTodo == todo.id).map((step) => (
              <div>
                <Step {...step} key={step.id} removeStep={removeStep} completeStep={completeStep}/>
              </div>
            ))}
          <StepForm idTodo={todo.id} addStep = {addStep}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
