import { useState } from "react";


interface TodoProps {
  id: string;
  text: string;
  category: string;
  finalDate: Date;
  isCompleted: boolean;
  removeTodo: (id: string) => void
  completeTodo: (id: string) => void
  updateTodo: (id: string, text: string, category: string, finalDate: string) => void;
}

export function Todo( {id, text, category, finalDate, isCompleted, removeTodo, completeTodo, updateTodo }: TodoProps){

    const [isEditing, setIsEditing] = useState(false);
    const [updatedText, setUpdatedText] = useState(text);
    const [updatedCategory, setUpdatedCategory] = useState(category);
    const [updatedFinalDate, setUpdatedFinalDate] = useState(finalDate.toISOString().split('T')[0]);


    const today = new Date().toDateString()
    const currentDate = new Date(today)

    const handleUpdate = () => {
      updateTodo(id, updatedText, updatedCategory, updatedFinalDate);
      setIsEditing(false);
    };

    return(
      <div className="todo" style={{textDecoration: isCompleted ? "line-through" : ""}}>
        {isEditing ? (
        <div>
          <input 
            type="text" 
            value={updatedText} 
            onChange={(e) => setUpdatedText(e.target.value)} 
          />
          <input 
            type="text" 
            value={updatedCategory} 
            onChange={(e) => setUpdatedCategory(e.target.value)} 
          />
          <input 
            type="date" 
            value={updatedFinalDate} 
            onChange={(e) => setUpdatedFinalDate(e.target.value)} 
          />
          <button onClick={handleUpdate}>Salvar</button>
        </div>
      ) :
      (
        <div>
            <div className="content">
              { finalDate < currentDate && <span>Atrasado</span>}
              <p>{text}</p>
              <p>({category})</p>
              <p style={{color: finalDate >= currentDate ? 'blue': 'red'}}>{finalDate.toLocaleDateString("pt-BR")}</p>
            </div>
            <div>
              <button className="complete" onClick={() => completeTodo(id)}>Completar</button>
              <button onClick={() => setIsEditing(true)}>Editar</button>
              <button className="remove" onClick={() => removeTodo(id)}>X</button>
        </div>
            </div>)}
          </div>
    )
}