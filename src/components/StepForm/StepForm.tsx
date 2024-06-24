import { useState } from "react";
import Modal from 'react-modal';

interface StepFormProps {
    idTodo: string,
    addStep: (idTodo: string, text: string) => void;
}

export function StepForm( { idTodo, addStep }: StepFormProps) {
    const [value, setValue] = useState("")
    const [visible, setVisible] = useState(false)

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
        setVisible(false)
    }

    return(
        <div className="todo-form">
            <button onClick={() => setVisible(true)}>+ Criar Etapa</button>
            <Modal isOpen={visible} onRequestClose={() => setVisible(false)} style={{
                overlay:{
                    background: "rgba(0, 0, 0, 0.700)",
                    boxSizing: "border-box"
                    }
                    }}>
                        <div className="modalForm">
            <h3>Criar etapa: </h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Digite o nome da etapa" 
                value={value}
                onChange={(e) => setValue(e.target.value)}/>
                <button type="submit">Criar Etapa</button>
            </form>
                </div>
                </Modal>
        </div>
    )
}