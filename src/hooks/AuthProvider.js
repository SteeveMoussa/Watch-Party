import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => { 
    const [username, setUser] = useState('')
    const [sessionId, setSession] = useState(localStorage.getItem("sessionId"))
    const navigate = useNavigate()
    const api_key = process.env.REACT_APP_TMDB_API_KEY

    const loginAction = async (username,password,reqToken) => {
        try {
            await validateLogin(username,password,reqToken)        
            const data = await getSession(reqToken)
            
            const dataJ = await data.json()
            if (dataJ) {
                setUser(username)
                setSession(dataJ["session_id"])
                localStorage.setItem("sessionId", dataJ["session_id"])
                navigate("/watchlist");
                return;
            }
            throw new Error("Something went wrong!")
        } catch (err) {
            console.error(err)
        }

    }

    // Approve token with login
    const validateLogin = async (username, password, request_token) => {
        try {
            await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${api_key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password, request_token})
            })
        } catch (err){
            console.error(err)
        }
    }

    // Get the session Id
    const getSession = async (request_token) => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${api_key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({request_token})
            })
            return data;
        } catch (err) {
            console.error(err)
        }
    }

    const logOut = () => {
        setUser(null)
        setSession("")
        localStorage.removeItem("sessionId")
        navigate("/login")
    }
  
    return (
        <AuthContext.Provider value={{username, sessionId, loginAction, logOut}}>
            {children}
        </AuthContext.Provider>);
};



export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};