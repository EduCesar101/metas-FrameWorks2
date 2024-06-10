import React from "react";


interface TodoProps {
  id: number;
  text: string;
  category: string;
  isCompleted: boolean;
  removeTodo: (id: number) => void
  completeTodo: (id: number) => void
}

export function Todo( {id, text, category, isCompleted, removeTodo, completeTodo }: TodoProps){

    return(
      <div className="todo" style={{textDecoration: isCompleted ? "line-through" : ""}}>
            <div className="content">
              <p>{text}</p>
              <p>({category})</p>
            </div>
            <div>
              <button className="complete" onClick={() => completeTodo(id)}>Completar</button>
              <button className="remove" onClick={() => removeTodo(id)}>X</button>
            </div>
          </div>
    )
}