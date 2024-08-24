 

import React, { useContext, useEffect, useState } from 'react';
import "./login.css";
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';

export const Login = ({ setShowLogin }) => {
    
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
 
 

    useEffect(() => {
        console.log(data);
    }, [data]);
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();

        var newUrl = url;
        if (currState === "Login") {
            newUrl += '/api/user/login';
        } else {
            newUrl += '/api/user/register';
        }
        try {
            const response = await axios.post(`${newUrl}`, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            alert("An error occurred. Please try again.");
        }

        
    };

     

    return (
        <div className='login'>
            <form className='login-container' onSubmit={onLogin}>
                <div className='login-title'>
                    <h2>{currState}</h2>
                    <h2 onClick={() => setShowLogin(false)}>x</h2>
                </div>
                <div className='login-inputs'>
                    {currState === "SignUp" && (
                        <input
                            name='name'
                            value={data.name}
                            onChange={onChangeHandler}
                            type='text'
                            placeholder='Enter Your Name'
                            required
                        />
                    )}
                    <input
                        type='email'
                        name='email'
                        value={data.email}
                        onChange={onChangeHandler}
                        placeholder='Enter Email'
                        required
                    />
                    <input
                        type='password'
                        name='password'
                        value={data.password}
                        onChange={onChangeHandler}
                        placeholder='Password'
                        required
                    />
                </div>
                <button type='submit'>{currState === "SignUp" ? "Create account" : "Login"}</button>
                <div className='login-condition'>
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the terms of use and privacy policy</p>
                </div>
                {currState === "Login" ? (
                    <p>
                        Create a New Account? <span onClick={() => setCurrState("SignUp")}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};
