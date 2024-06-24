import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../services/firebase";
import { useContext } from "react";
import { AuthGoogleContext } from "../../context/AuthGoogleContext";
import { Navigate } from "react-router-dom";
import defaultProfilePhoto from '../../assets/img/default-profile-photo.jpg'

const provider = new GoogleAuthProvider();

export function Login(){
    const { signInGoogle, signed } = useContext(AuthGoogleContext);

    async function loginGoogle(){
        await signInGoogle()
    }

    if(!signed){
        return(
        <div className="home">
            <h1>Entre com sua conta Google</h1>
            <div className="imghome">
            <img src={defaultProfilePhoto} alt="" style={{borderRadius: "250px"}}/>
            </div>
            <button onClick={() => loginGoogle()} className="bLogin">Entrar com Google</button>
        </div>
    )
    } else {
        return <Navigate to={"/main"}/>
    }
}