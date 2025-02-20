import { BookingLayout } from "../components/BookingLayout";
import { Events } from "../views/categories/Events";
import { FullFloorOffice } from "../views/categories/FullFloorOffice";
import { MeetingRooms } from "../views/categories/MeetingRooms";
import { PrivateOffice } from "../views/categories/PrivateOffice";
import { DedicatedDesk } from "../views/categories/DedicatedDesk";
import { SpaceDetail } from "../views/SpaceDetail";
import { Home } from "../views/Home";
import { Routes, Route, Navigate } from "react-router-dom";

export const BookingAppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<BookingLayout/>}>
                {/* Definir la ruta principal (index) directamente */}
                <Route index element={<Home />} />
                
                {/* Rutas hijas sin usar index */}
                <Route path="space/:spaceId" element={<SpaceDetail />} />
                <Route path="meeting-rooms" element={<MeetingRooms />} />
                <Route path="dedicated-desk" element={<DedicatedDesk />} />
                <Route path="full-offices" element={<FullFloorOffice />} />
                <Route path="event" element={<Events />} />
                <Route path="private-offices" element={<PrivateOffice />} />
                
                {/* Redirección para cualquier otra ruta no encontrada */}
                <Route path="/*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    );
};
