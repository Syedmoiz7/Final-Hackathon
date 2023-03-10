import './index.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";

import { GlobalContext } from '../context/Context';
import { useContext } from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import Home from "./home";
import Profile from "./profile";
import Login from "./login"
import Signup from "./signup"
import ChangePassword from "./changePassword"
import ForgetPassword from "./forgetPassword"
import GetStarted from "./getStarted"
import DiscountStore from "./userDiscountStore.jsx"
import AllProducts from "./adminAllProducts.jsx"


import { get } from 'mongoose';




function Render() {

  let { state, dispatch } = useContext(GlobalContext);

  console.log("state: ", state);

  const logutHandler = async () => {


    try {
      let response = await axios.post(`${state.baseUrl}/logout`,
        {}, {
        withCredentials: true
      })

      dispatch({
        type: "USER_LOGOUT"
      })

    } catch (error) {
      console.log("error: ", error);
    }

  }

  const getProfile = async () => {

    try {
      let response = await axios.get(`${state.baseUrl}/profile`, {
        withCredentials: true
      })

      dispatch({
        type: "USER_LOGIN",
        payload: response.data
      })
    } catch (error) {

      console.log("error: ", error);
      dispatch({
        type: "USER_LOGOUT"
      })
    }


  }

  useEffect(() => {
    getProfile()
  }, [state.isLogin]);

  // useEffect(() => {

  //   // Add a request interceptor
  //   axios.interceptors.request.use(function (config) {
  //     // Do something before request is sent
  //     console.log("interceptor");
  //     config.withCredentials = true
  //     return config;
  //   }, function (error) {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   });

  //   // Add a response interceptor
  //   axios.interceptors.response.use(function (response) {
  //     // Any status code that lie within the range of 2xx cause this function to trigger
  //     // Do something with response data
  //     return response;
  //   }, function (error) {
  //     // Any status codes that falls outside the range of 2xx cause this function to trigger
  //     // Do something with response error

  //     if (error.response.status === 401) {
  //       dispatch({
  //         type: "USER_LOGOUT"
  //       })
  //     }
  //     return Promise.reject(error);
  //   });
  // }, [])


  return (

    <div className={` ${(state.isLogin === true) ? "Lit" : "Dark"} `}>


      {/* 
      {
        (state.isLogin === false) ?
          ""
          :
          null
      } */}

      {(state.isLogin === false) ?
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        :
        null
      }


      {(state.isLogin === true && state.user.isAdmin === undefined) ?
        <div>
          <Routes>
            <Route path="/" element={<DiscountStore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="*" element={
              <Navigate to="/" replace={true} />
            } />
          </Routes>
        </div>
        :
        null
      }

      {(state.isLogin === true && state.user.isAdmin === true) ?
        <div>
          <Routes>
            <Route path="/" element={<AllProducts />} />
            <Route path="*" element={
              <Navigate to="/" replace={true} />
            } />
          </Routes>
        </div>
        :
        null
      }

      {
        (state.isLogin === true) ?
          <div> {state?.user?.firstName} <button onClick={logutHandler}>Logout</button></div>
          :
          null
      }

      {(state.isLogin === null) ?
        <div>
          loading
        </div>
        :
        null
      }


    </div>
  );
}

export default Render;





















