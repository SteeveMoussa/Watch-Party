import React, { useState, useEffect, setState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

// Get the user details and call the necessary apis
function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [reqToken, setToken] = useState([])
    const api_key = process.env.REACT_APP_TMDB_API_KEY
    const navigate = useNavigate()

    // Ran on page load to get the request token
    useEffect(() => { 
        const user = localStorage.getItem('sessionId') 
        if (user && user !== 'undefined') {            
            navigate('/watchlist')      
        }
        requestToken() 
    }, [])
     
    const auth = useAuth()
    const onButtonClick = async () =>  {
        try {
            if (username !== "" && password !== "") {
                auth.loginAction(username,password,reqToken)
                return
            }
            alert("Please provide a valid input");
        } catch (err) {
            console.error(err)
        }
    }

    // Get the request token, will be called on page load
    // Needs some error handling
    const requestToken = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${api_key}`)
        const dataJ = await data.json()
        if (dataJ) {
            setToken(dataJ["request_token"])
            return
        }
    }

    return(
        <div className="mainContainer">
            <div className="titleContainer">
                Login
            </div>

            <div className="inputContainer">
                <input
                    value={username}
                    placeholder="Username here"
                    onChange={(ev) => setUsername(ev.target.value)}
                    className={"inputBox"}
                />
            </div>

            <div className="inputContainer">
                <input
                    value={password}
                    type="password"
                    placeholder="Password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />
            </div>

            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
            </div>
        </div>
    )
}

export default Login