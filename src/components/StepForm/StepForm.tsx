import { useState } from "react";

interface StepFormProps {
    idTodo: number,
    addStep: (idTodo: number, text: string) => void;
}

export function StepForm( { idTodo, addStep }: StepFormProps) {
    const [value, setValue] = useState("")

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        if(!value){
            alert("Preencha todos os campos!")
            return
        }
        addStep(idTodo, value)
        console.log(idTodo, value)
        console.log("Enviou form");
        setValue("")
    }

    return(
        <div className="todo-form">
            <h3>Criar etapa: </h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Digite o nome da etapa" 
                value={value}
                onChange={(e) => setValue(e.target.value)}/>
                <button type="submit">Criar Etapa</button>
            </form>
        </div>
    )
}