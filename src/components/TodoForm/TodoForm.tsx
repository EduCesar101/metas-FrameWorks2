import { useState } from "react";
import Modal from 'react-modal';

interface TodoFormProps {
    addTodo: (text: string, category: string, finalDate: string) => void;
}

export function TodoForm( { addTodo }: TodoFormProps ) {
    const [value, setValue] = useState("")
    const [finalDate, setFinalDate] = useState("")
    const [category, setCategory] = useState("")
    const [visible, setVisible] = useState(false)

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        if(!value || !category){
            alert("Preencha todos os campos!")
            return
        }
        addTodo(value, category, finalDate)
        console.log("Enviou form");
        setValue("")
        setCategory("")
        setVisible(false)
    }

    return(
        <div className="todo-form">
            <button onClick={() => setVisible(true)} className="Create">+ Criar Meta</button>
            <Modal isOpen={visible} onRequestClose={() => setVisible(false)} style={{
                overlay:{
                    background: "rgba(0, 0, 0, 0.700)",
                    boxSizing: "border-box"
                    }
                    }}>
                    <div className="modalForm">
                <h2>Criar meta: </h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Digite o título" 
                value={value}
                onChange={(e) => setValue(e.target.value)}/>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Selecione uma categoria</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Estudos">Estudos</option>
                </select>
                <input type="date" value={finalDate} onChange={(e) => setFinalDate(e.target.value)}/>
                <button type="submit">Criar Meta</button>
            </form>
                </div>
            </Modal>
        </div>
    )
}