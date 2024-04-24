import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { useQuery } from "react-query";

const api_key = process.env.REACT_APP_TMDB_API_KEY
const requestToken = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${api_key}`)
    const dataJ = await data.json()
    return dataJ["request_token"]
}

// Get the user details and call the necessary apis
function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const auth = useAuth()

    const reqToken = useQuery("request_token", requestToken); // Does this cache??


    // Ran on page load to get the request token
    useEffect(() => { 
        const user = auth.sessionId // Get from cache somehow?????
        if (user && user !== 'undefined') {            
            navigate('/watchlist')      
        }
    }, [])
     
    const onButtonClick = async () =>  {
        try {
            if (username !== "" && password !== "") {
                auth.loginAction(username,password,reqToken.data)
                return
            }
            alert("Please provide a valid input");
        } catch (err) {
            console.error(err)
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