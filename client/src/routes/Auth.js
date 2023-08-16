import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from '../utils/routes';
import {Login} from '../Component/Login/Login';
import {SignUp} from '../Component/SignUp/SignUp';
import ProductPage from "../Component/ProductPage/ProductPage"
import CreateProduct from '../Component/CreateProduct/CreateProduct';
const AuthRoutes= () => (

    <Routes>
      <Route path={ROUTES.AUTH_ROUTES.login} element={<Login/>} />
      <Route
        path={ROUTES.AUTH_ROUTES.signup}
        element={<SignUp/>}
      />
      <Route
        path={ROUTES.AUTH_ROUTES.root}
        element={<ProductPage/>}
      />
      <Route path = {ROUTES.AUTH_ROUTES.createproduct} element = {<CreateProduct/>}/>
    </Routes>

);

export default AuthRoutes;
