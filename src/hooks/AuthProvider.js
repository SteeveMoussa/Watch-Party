import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
const AuthContext = createContext();

const AuthProvider = ({ children }) => { 
    const [username, setUser] = useState(localStorage.getItem("user"))
    const [sessionId, setSession] = useState(localStorage.getItem("sessionId"))
    const navigate = useNavigate()

    // Approve token with login
    const validateLogin = async (loginData) => {
        try {
            await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
                },
                body: JSON.stringify(loginData)
            })
            return await getSession(loginData.request_token)
        } catch (err){
            console.error(err)
        }
    }

    // Get the session Id
    const getSession = async (request_token) => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/authentication/session/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
                },
                body: JSON.stringify({request_token})
            })
            return data.json();
        } catch (err) {
            console.error(err)
        }
    }

    const session = useMutation("session_id", validateLogin)

    const loginAction = async (username,password,request_token) => {
        const loginData = {
            username: username,
            password: password,
            request_token: request_token
        }
        try {
            const data = await session.mutateAsync(loginData)
            if(data) {
                setUser(username)
                setSession(data["session_id"])
                localStorage.setItem("sessionId", data["session_id"])
                localStorage.setItem("user", username)
                navigate("/watchlist");
                return;
            }
        } catch (err) {
            console.error(err)
        }
    }

    const logOut = () => {
        setUser(null)
        setSession("")
        localStorage.removeItem("sessionId")
        localStorage.removeItem("user")
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