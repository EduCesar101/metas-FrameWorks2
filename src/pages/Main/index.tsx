import { useContext, useState } from 'react' 
import '../../App.css'
import { Todo } from '../../components/Todo/Todo';
import { TodoForm } from '../../components/TodoForm/TodoForm'
import { Search } from '../../components/Search/Search';
import Filter from '../../components/Filter/Filter';
import { Step } from '../../components/Step/Step';
import { StepForm } from '../../components/StepForm/StepForm';
import { AuthGoogleContext } from '../../context/AuthGoogleContext';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';

interface TodoType {
  id: string;
  text: string;
  category: string;
  finalDate: Date;
  isCompleted: boolean;
}

interface StepType {
  id: string;
  text: string;
  idTodo: string;
  isCompleted: boolean;
}

export function Main() {
  const { user, signOut } = useContext(AuthGoogleContext)
  

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [steps, setSteps] = useState<StepType[]>([]);

  const [genTodoId, setGenTodoId] = useState(2);
  const [genStepId, setGenStepId] = useState(0);
  let loggedUser = JSON.parse(user)


  const [search, setSearch] = useState("");
  
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc")

  const fetchTodos = async (userId: string) => {
    const todosRef = collection(db, 'todos');
    const q = query(todosRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const fetchedTodos: TodoType[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      finalDate: new Date(doc.data().finalDate.toDate())
    } as TodoType));
    setTodos(fetchedTodos);
    console.log('fetchTodo')
  };

  const fetchSteps = async () => {
    const stepsRef = collection(db, 'steps');
    const querySnapshot = await getDocs(stepsRef);
    const fetchedSteps: StepType[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as StepType));
    setSteps(fetchedSteps);
    console.log('fetchStep')
  };

  const addTodo = (async (text: string, category: string, finalDate: string) => {
    const newDate = new Date(finalDate)
    const newTodo = 
      {
        text,
        category,
        finalDate: newDate,
        isCompleted: false,
        userId: loggedUser.uid
      };
    const docRef = await addDoc(collection(db, 'todos'), newTodo);
    setTodos([...todos, { id: docRef.id, ...newTodo }]);
  })



  const removeTodo = ( async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
    setTodos(todos.filter(todo => todo.id !== id));
  })

  const completeTodo = ( async (id: string) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return;
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      isCompleted: !todo.isCompleted
    });
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
  })

  const updateTodo = async (id: string, updatedText: string, updatedCategory: string, updatedFinalDate: string) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      text: updatedText,
      category: updatedCategory,
      finalDate: new Date(updatedFinalDate)
    });
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: updatedText, category: updatedCategory, finalDate: new Date(updatedFinalDate) } : todo)));
  };

  const addStep = ( async   (idTodo: string, text: string) => {
    const newStep = 
      {
        text: text,
        idTodo: idTodo,
        isCompleted: false
      };
    const docRef = await addDoc(collection(db, 'steps'), newStep);
    setSteps([...steps, { id: docRef.id, ...newStep }]);
  })

  const removeStep = ( async (id: string) => {
    await deleteDoc(doc(db, 'steps', id));
    setSteps(steps.filter(step => step.id !== id));
  })

  const completeStep = ( async (id: string) => {
    const step = steps.find(step => step.id === id);
    if (!step) return;
    const stepRef = doc(db, 'steps', id);
    await updateDoc(stepRef, {
      isCompleted: !step.isCompleted
    });
    setSteps(steps.map(step => (step.id === id ? { ...step, isCompleted: !step.isCompleted } : step)));

  })



  fetchTodos(loggedUser.uid)
  fetchSteps()

  return (
    <>
      <div className="app">
        <div className='profile'>
          <div className='profile-name'>
          <img src={loggedUser.photoURL} alt="" />
          <strong>{loggedUser.displayName}</strong>
          </div>
          <button onClick={() => signOut()}>Sair</button>
        </div>
      </div>
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
            <div key={todo.id}>
              <Todo {...todo} key = {todo.id} removeTodo={removeTodo} completeTodo={completeTodo} updateTodo={updateTodo}/>
              {steps.filter((step) => step.idTodo == todo.id).map((step) => (
                <div key={step.id}>
                  <Step {...step} key={step.id} removeStep={removeStep} completeStep={completeStep}/>
                </div>
              ))}
            <StepForm idTodo={todo.id} addStep = {addStep}/>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
