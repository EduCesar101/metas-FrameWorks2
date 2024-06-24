import { useState } from 'react'; 
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

interface StepProps {
    id: string,
    idTodo: string,
    text: string,
    isCompleted: boolean,
    removeStep: (id: string) => void,
    completeStep: (id: string) => void
}

export function Step({ id, text, removeStep, completeStep, isCompleted }: StepProps){
    const handleCompleteStep = async () => {
        try {
          const stepRef = doc(db, 'steps', id);
          await updateDoc(stepRef, {
            isCompleted: !isCompleted
          });
          completeStep(id);
        } catch (error) {
          console.error("Error completing step: ", error);
        }
      };
    
      const handleRemoveStep = async () => {
        try {
          await deleteDoc(doc(db, 'steps', id));
          removeStep(id);
        } catch (error) {
          console.error("Error removing step: ", error);
        }
      };

    return(
        <div className={`step ${isCompleted ? 'completed' : ''}`}>
      <div className="content">
        <p style={{textDecoration: isCompleted ? "line-through" : ""}}>{text}</p>
      </div>
      <div>
        <button onClick={handleCompleteStep}>{isCompleted ? 'Desmarcar' : 'Completar'}Completar</button>
        <button onClick={handleRemoveStep}>Remover</button>
      </div>
    </div>
    )
}