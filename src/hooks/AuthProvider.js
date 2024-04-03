import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
    const [username, setUser] = useState('')
    const [sessionId, setSession] = useState([])
    const navigate = useNavigate()

    const loginAction = async (email,password,reqToken) => {
        try {
            await validateLogin(email,password,reqToken)        
            const data = await getSession(reqToken)
            
            const dataJ = await data.json()
            if (dataJ) {
                setUser(email)
                setSession(dataJ["session_id"])
                navigate("/watchlist");
                return;
            }
            throw new Error("Something went wrong!")
        } catch (err) {
            console.error(err)
        }

    }
  
    return (
        <AuthContext.Provider value={{username, sessionId, loginAction}}>
            {children}
        </AuthContext.Provider>);
};

// Approve token with login
const validateLogin = async (username, password, request_token) => {
    await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key={}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, request_token})
    })
}

// Get the session Id
const getSession = async (request_token) => {
    const data = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key={}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({request_token})
    })
    return data;

}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};