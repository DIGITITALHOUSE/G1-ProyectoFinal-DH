import { Routes, Route, Navigate } from 'react-router-dom';
import { BookingAppRouter } from './BookingAppRouter';
import { AuthRouter } from './AuthRouter';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<BookingAppRouter />} />
            <Route path="/auth/*" element={<AuthRouter />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter; 