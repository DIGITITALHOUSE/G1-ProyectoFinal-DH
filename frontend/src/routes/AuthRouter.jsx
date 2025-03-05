import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../views/auth/Login';
import { Register } from '../views/auth/Register';

export const AuthRouter = () => {
    return (
        <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};