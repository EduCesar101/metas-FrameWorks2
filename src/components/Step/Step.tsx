interface StepProps {
    id: number,
    idTodo: number,
    text: string,
    isCompleted: boolean,
    removeStep: (id: number) => void,
    completeStep: (id: number) => void
}

export function Step({ id, text, removeStep, completeStep }: StepProps){
    return(
        <div>
            <div className="content">
                <p>{text}</p>
            </div>
            <div>
                <button onClick={() => completeStep(id)}>V</button>
                <button onClick={() => removeStep(id)}>X</button>
            </div>
        </div>
    )
}