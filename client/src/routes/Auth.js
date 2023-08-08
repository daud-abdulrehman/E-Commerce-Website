import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from '../utils/routes';
import {Login} from '../Component/Login';
import {SignUp} from '../Component/SignUp';

const AuthRoutes= () => (

    <Routes>
      <Route path={ROUTES.AUTH_ROUTES.login} element={<Login/>} />
      <Route
        path={ROUTES.AUTH_ROUTES.signup}
        element={<SignUp/>}
      />
      <Route
        path="*"
        element={<Navigate to={ROUTES.AUTH_ROUTES.login} replace />}
      />
      
    </Routes>

);

export default AuthRoutes;
