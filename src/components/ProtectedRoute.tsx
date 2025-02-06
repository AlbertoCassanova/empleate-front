// React
import { FC } from 'react'
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteType = {
    isAllowed: string | null | boolean,
    redirectTo?: string,
    children?: JSX.Element
}

export const ProtectedRoute : FC<ProtectedRouteType> = ({isAllowed,redirectTo = "/",children,} : any) => {
    if (!isAllowed) {
        return <Navigate to={redirectTo} replace />;
    }
    return children ? children : <Outlet />;
};