import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../services/firebase";
import { useContext } from "react";
import { AuthGoogleContext } from "../../context/AuthGoogleContext";
import { Navigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export function Login(){
    const { signInGoogle, signed } = useContext(AuthGoogleContext);

    async function loginGoogle(){
        await signInGoogle()
    }

    if(!signed){
        return(
        <div className="app">
            <h1>Entre com usuário</h1>
            <button onClick={() => loginGoogle()}>Entrar com Google</button>
        </div>
    )
    } else {
        return <Navigate to={"/main"}/>
    }
}