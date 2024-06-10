import { useState } from "react";

interface StepFormProps {
    addStep: (text: string) => void;
}

export function StepForm( { addStep }: StepFormProps ) {
    const [value, setValue] = useState("")

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        if(!value){
            alert("Preencha todos os campos!")
            return
        }
        addStep(value)
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