import React from "react";

import { Navigate, Route, Routes,Outlet } from "react-router-dom";
import { PROTECTED_ROUTES } from "./AppRoutes";
import {Signup} from '../Component/SignUp/SignUp'
import { ROUTES } from "../utils/routes";
let user={'role':'purchaser'}

const ProtectedRoutes = () => (
  <Routes>
    {PROTECTED_ROUTES.map((route, index) => (
     (!route.role || route.role?.includes(user.role)) &&
      (<Route key={index} path={route.path} element={route.element} exact>
        
        {route.children &&
          route.children.map((childRoute) => (
            <Route
            exact
              key={childRoute.id}
              path={childRoute.path}
              element={childRoute.element}
            />
          ))}
      </Route>)
          
    ))}<Route
      path={ROUTES.AUTH_ROUTES.login}
      //element={<Navigate to={ROUTES.PROTECTED_ROUTES_NAMES.root} replace />}
      element = {ROUTES.AUTH_ROUTES.login}
    />
    <Route
      path="*"
      element={<div>Page not Found 404 </div>}
    />
  </Routes>
);

export default ProtectedRoutes;
