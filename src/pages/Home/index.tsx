import { Link, Navigate, useNavigate } from "react-router-dom";
import  img1  from "../../assets/img/paper-list.jpg"

export function Home(){
    const navigate = useNavigate();
    function loginEvent(){
        navigate('/login')
    }
    return(
        <>
        <div className="home">
            <h1>Bem vindo ao Meta Master</h1>
            <div className="imghome">
            <img src={img1} alt="" />
            </div>
            <p>O MetaMaster é seu companheiro ideal para gerenciar e alcançar suas metas pessoais.</p>
            <p>Seja você um estudante, profissional, ou alguém em busca de desenvolvimento pessoal, 
            o MetaMaster oferece as ferramentas necessárias para transformar seus sonhos em realidade.</p>
            
            <strong>Funcionalidades Principais:</strong>
            <ul>
                <li><strong>Gerenciamento de Metas:</strong> Crie, edite e organize suas metas pessoais em diversas categorias. Acompanhe seu progresso e mantenha-se motivado com lembretes e atualizações.</li>
                <li><strong>Passos Detalhados:</strong> Divida suas metas em passos menores e mais gerenciáveis. Cada passo é um degrau a mais na direção de seu objetivo final.</li>
                <li><strong>Autenticação Segura com Google:</strong>Faça login de maneira rápida e segura usando sua conta do Google. Suas informações estarão sempre protegidas e acessíveis de qualquer dispositivo.</li>
            </ul>

            <button onClick={() => loginEvent()} className="bLogin">Comece agora</button>
        </div>
        </>
    )
}