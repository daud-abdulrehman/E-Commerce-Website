import React from 'react'
import {useState} from "react"
import { Button } from '@mui/material';
import { ROUTES } from '../utils/routes';
import { Navigate, Route, Routes } from "react-router-dom";

// import { useHistory } from 'react-router-dom';



function LogOut() {
    // const history = useHistory();

    const handleLogout = () => {
        localStorage.clear();
    // Perform logout logic, clear authentication data, etc.

    // Redirect the user to the login page
    // history.push('/login');
    }
    return (
      <div className="App">
        <br/>
        <Button onClick={handleLogout} variant="contained">LogOut</Button>
      </div>
    );

  }


export default LogOut;