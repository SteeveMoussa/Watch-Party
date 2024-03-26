import React, { useState, useEffect, setState } from "react";

// Get the user details and call the necessary apis
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reqToken, setState] = useState([])
    const [sessionId, setSession] = useState([])

    useEffect(() => { requestToken() }, [])
     
    
    const onButtonClick = async () =>  {
        // Approve token with login
        await validateLogin(email,password,reqToken)        

        // Get the session ID and have that be used for following calls (eg. Watchlist)
        await getSession(reqToken)
        
    }

    // Get the request token, will be called on page load
    // Needs some error handling
    const requestToken = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=4d66743121b0dbdad3e051e80881196e`)
        const dataJ = await data.json()
        setState(dataJ["request_token"])
    }

    const validateLogin = async (username, password, request_token) => {
        await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=4d66743121b0dbdad3e051e80881196e`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password, request_token})
        })
    }

    const getSession = async (request_token) => {
        const data = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=4d66743121b0dbdad3e051e80881196e`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({request_token})
        })
        const dataJ = await data.json()
        setSession(dataJ["session_id"])
    }


    // Find out which is better between this and async and why
    // const requestToken = async () => {
    //     fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=4d66743121b0dbdad3e051e80881196e`)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         const data = JSON.parse(responseJson)
    //         setState(data)
    //     })
    // }


    return(
        <div className="mainContainer">
            <div className="titleContainer">
                Login
            </div>

            <div className="inputContainer">
                <input
                    value={email}
                    placeholder="Enter email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="inputBox"
                />
            </div>

            <div className="inputContainer">
                <input
                    value={password}
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