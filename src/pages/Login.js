import React, { useState, useEffect, setState } from "react";
import { useAuth } from "../hooks/AuthProvider";

// Get the user details and call the necessary apis
function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [reqToken, setState] = useState([])
    const [sessionId, setSession] = useState([])
    
    // Ran on page load to get the request token
    useEffect(() => { requestToken() }, [])
     
    const auth = useAuth()
    const onButtonClick = async () =>  {
        auth.loginAction(username,password,reqToken)
    }

    // Get the request token, will be called on page load
    // Needs some error handling
    const requestToken = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key={}`)
        const dataJ = await data.json()
        setState(dataJ["request_token"])
    }

    const validateLogin = async (username, password, request_token) => {
        await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key={}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password, request_token})
        })
    }

    const getSession = async (request_token) => {
        const data = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key={}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({request_token})
        })
        const dataJ = await data.json()
        setSession(dataJ["session_id"])
    }

    return(
        <div className="mainContainer">
            <div className="titleContainer">
                Login
            </div>

            <div className="inputContainer">
                <input
                    value={username}
                    placeholder="Enter email here"
                    onChange={(ev) => setUsername(ev.target.value)}
                    className="inputBox"
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