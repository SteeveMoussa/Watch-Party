import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Home() {
    const auth = useAuth();


    return(
        <div>
            <div className="header">
                <div className="home" >
                    <FontAwesomeIcon icon={faHouse} />
                </div>
                <h1 className="title">Home</h1> 
                <div className="logout" onClick={() => auth.logOut()}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>
        </div>
    )
}

export default Home