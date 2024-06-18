import React from "react";


interface TodoProps {
  id: number;
  text: string;
  category: string;
  finalDate: Date;
  isCompleted: boolean;
  removeTodo: (id: number) => void
  completeTodo: (id: number) => void
}

export function Todo( {id, text, category, finalDate, isCompleted, removeTodo, completeTodo }: TodoProps){
    const today = new Date().toDateString()
    const currentDate = new Date(today)
    console.log(currentDate.toLocaleString())
    return(
      <div className="todo" style={{textDecoration: isCompleted ? "line-through" : ""}}>
            <div className="content">
              { finalDate < currentDate && <span>Atrasado</span>}
              <p>{text}</p>
              <p>({category})</p>
              <p style={{color: finalDate >= currentDate ? 'blue': 'red'}}>{finalDate.toLocaleDateString()}</p>
            </div>
            <div>
              <button className="complete" onClick={() => completeTodo(id)}>Completar</button>
              <button className="remove" onClick={() => removeTodo(id)}>X</button>
            </div>
          </div>
    )
}