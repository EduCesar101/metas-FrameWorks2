import { useState, ReactNode, createContext, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { app } from ".././services/firebase";
import { Navigate } from "react-router-dom";

interface AuthProviderProps{
    children: ReactNode
}

interface AuthContextProps {
    user: User | null;
    signInGoogle: () => void
    signed: boolean
    signOut: () => void
}

export const AuthGoogleContext = createContext({} as AuthContextProps)

const provider = new GoogleAuthProvider()

export const AuthGoogleProvider = ({ children }: AuthProviderProps) => {
    const auth = getAuth(app);
    const [user, setUser] = useState("")

    useEffect(() => {
        const loadStoreAuth = () => {
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
            if(sessionToken && sessionUser){
                setUser(sessionUser);
            }
        }
        loadStoreAuth()
    },[])

    function signInGoogle(){

        signInWithPopup(auth, provider)
        .then((result) => {
            
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            setUser(user)
            console.log(user)
            sessionStorage.setItem("@AuthFirebase:token", token);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        }).catch((error) => {
            
            const errorCode = error.code;
            const errorMessage = error.message;
            
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            
        });

    }

    function signOut(){
        sessionStorage.clear()
        setUser(null);

        return(<Navigate to={"/"}/>)
    }
    return(
        <AuthGoogleContext.Provider value={{ signInGoogle, signed: !!user, user, signOut }}>{ children }</AuthGoogleContext.Provider>
    )
}
        
