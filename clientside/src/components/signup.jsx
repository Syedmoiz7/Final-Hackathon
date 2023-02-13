import { useState } from "react";
import { Link } from "react-router-dom";
import './signup.css';
import axios from 'axios';

import { GlobalContext } from '../context/Context';
import { useContext } from "react";


function Signup() {

    let { state, dispatch } = useContext(GlobalContext);

    const [name, setName] = useState("")
    // const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [password, setPassword] = useState("")

    const [result, setResult] = useState("")

    const signupHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/signup`, {
                firstName: name,
                lastName: name,
                email: email,
                password: password
            })

            console.log("signup successfull")
            setResult("signup successful")
        }

        catch (e) {
            console.log("error: ", e);
        }

    }

    return (
        <div className="mainContainer">

            {/* <div className="heading">
                <h1>Sign Up</h1>
            </div> */}


            <form onSubmit={signupHandler}>
                <div className="formSignup">

                    <h1>SAYLANI WELFARE</h1>
                    <h4>ONLINE DISCOUNT STORE</h4>

                    <input type="text" className="inputs" name="name"
                        placeholder="Full Name" required
                        onChange={(e) => { setName(e.target.value) }} />
                    <br />

                    <input type="number" className="inputs" name="contact"
                        placeholder="Contact" required
                        onChange={(e) => { setContact(e.target.value) }} />
                    <br />

                    <input type="email" className="inputs" name="email"
                        placeholder="Email" required
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <br />

                    <input type="password" className="inputs" name="password"
                        placeholder="Password" required
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <br />

                    <button type="submit" className='btn'>Sign Up</button>

                    <p>Already have an account?</p>

                    <Link className="loginLink" to={'/login'}>Login</Link>

                </div>
            </form>

            <p>{result}</p>

        </div>)
}

export default Signup;