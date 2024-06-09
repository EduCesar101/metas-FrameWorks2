import { useState } from "react";

interface TodoFormProps {
    addTodo: (text: string, category: string) => void;
}

export function TodoForm( { addTodo }: TodoFormProps ) {
    const [value, setValue] = useState("")
    const [category, setCategory] = useState("")

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        if(!value || !category){
            alert("Preencha todos os campos!")
            return
        }
        addTodo(value, category)
        console.log("Enviou form");
        setValue("")
        setCategory("")
    }

    return(
        <div className="todo-form">
            <h2>Criar tarefa: </h2>
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
                <button type="submit">Criar Tarefa</button>
            </form>
        </div>
    )
}