import { Navigate, Outlet } from "react-router-dom";
import React from 'react'

export const ProtectedRoute = ({ isAllowed, children } ) => {
    
    if(!isAllowed){
        return <Navigate to ="/login"  replace/>
    }

    return children ? children : <Outlet />;
}