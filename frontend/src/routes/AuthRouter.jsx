import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../views/auth/Login';
import { Register } from '../views/auth/Register';
import { BookingLayout } from "../components/layouts/BookingLayout";

export const AuthRouter = () => {
    return (
        <Routes>
            <Route element={<BookingLayout/>}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/*" element={<Navigate to="/auth/login" />} />
            </Route>
        </Routes>
    );
};