import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { RootState } from './store/Store';

interface ProtectedRouteProps {
    path: string;
    element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
    const isAuthenticated = useSelector((state: RootState) => state);

    return isAuthenticated ? (
        <Route path={path} element={element} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
