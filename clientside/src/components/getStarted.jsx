import './getStarted.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";

import { GlobalContext } from '../context/Context';
import { useContext } from "react";

import axios from 'axios';



function GetStarted() {

    let { state, dispatch } = useContext(GlobalContext);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [result, setResult] = useState("")

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/get-started`)

        } catch (e) {
            console.log("error: ", e);
        }

    }

    return (
        <div className='Cont'>
            <div className='Card'>

                <img src="" alt="" />

                <h1>Saylani Welfare</h1>
                <h3>ONLINE DISCOUNT STORE</h3>

                <div>


                </div>
            </div>
        </div>)
}

export default GetStarted;