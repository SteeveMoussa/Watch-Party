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

    const reqToken = useQuery("request_token", requestToken); 


    // Ran on page load to get the request token
    useEffect(() => { 
        const user = auth.sessionId 
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
        // <div className="mainContainer">
        //     <div className="titleContainer">
        //         Login
        //     </div>

        //     <div className="inputContainer">
        //         <label>Username</label>
        //         <input
        //             data-testid="usernameTest"
        //             name="username"
        //             value={username}
        //             placeholder="Username here"
        //             onChange={(ev) => setUsername(ev.target.value)}
        //             className={"inputBox"}
        //         />
        //     </div>

        //     <div className="inputContainer">
        //         <label>Password</label>
        //         <input
                    // data-testid="passwordTest"
                    // name="password"
                    // value={password}
                    // type="password"
                    // placeholder="Password here"
                    // onChange={(ev) => setPassword(ev.target.value)}
                    // className={'inputBox'}
        //         />
        //     </div>

            // <div className={'inputContainer'}>
            //     <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
            // </div>
        // </div>
//---------- Tailwind version -------------------//
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900">Username</label>
                        <div className="mt-2">
                            <input 
                                name="username" 
                                value={username}
                                id="username" 
                                placeholder="Username here"
                                data-testid="usernameTest"
                                onChange={(ev) => setUsername(ev.target.value)}
                                required 
                                className="inputBox block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div className="mt-2">
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                value={password}
                                data-testid="passwordTest"
                                placeholder="Password here"
                                required 
                                onChange={(ev) => setPassword(ev.target.value)}
                                className="inputBox block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                            />
                        </div>
                    </div>

                    {/* <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div> */}
                    <div className={'inputContainer'}>
                        <input 
                            // className={'inputButton'} 
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                            type="button" 
                            onClick={onButtonClick} 
                            value={'Log in'} />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Login