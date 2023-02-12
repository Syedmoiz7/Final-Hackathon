import './getStarted.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";

import { GlobalContext } from '../context/Context';
import { useContext } from "react";
import Logo from './Images/Logo.png'
import axios from 'axios';

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';


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

        // <Card style={{ width: '18rem' }}>
        //     <Card.Img variant="top" src="holder.js/100px180" />
        //     <Card.Body>
        //         <Card.Title>Card Title</Card.Title>
        //         <Card.Text>
        //             Some quick example text to build on the card title and make up the
        //             bulk of the card's content.
        //         </Card.Text>
        //         <Button variant="primary">Go somewhere</Button>
        //     </Card.Body>
        // </Card>

        <div className='Cont'>
            <div className='Card'>

                <img src={Logo} alt="" className='logo' />

                <h1>SAYLANI WELFARE</h1>
                <h4>ONLINE DISCOUNT STORE</h4>

                <Link to={'/signup'}><button className='getStartedBtn ' type='submit'>Get Started</button></Link>
            </div>
        </div>
    )
}

export default GetStarted;