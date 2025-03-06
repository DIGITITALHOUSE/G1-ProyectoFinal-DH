import { BookingLayout } from "../components/layouts/BookingLayout";
import { Events } from "../views/categories/Events";
import { FullFloorOffice } from "../views/categories/FullFloorOffice";
import { MeetingRooms } from "../views/categories/MeetingRooms";
import { PrivateOffice } from "../views/categories/PrivateOffice";
import { DedicatedDesk } from "../views/categories/DedicatedDesk";
import { Products } from "../views/categories/Products";
import { Categories } from "../views/categories/Categories";
import { EditProducts } from "../views/categories/EditProducts";
import { ListProducts } from "../views/categories/ListProducts";
import { ListCategories } from "../views/categories/ListCategories";
import { ListUsers } from "../views/categories/ListUsers";
import { SpaceDetail } from "../views/SpaceDetail";
import { Home } from "../views/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import AccessDeniedProducts from "../views/categories/AccessDeniedProducts";
import ProtectedRoute from "./ProtectedRoute";

export const BookingAppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<BookingLayout />}>
                {/* Definir la ruta principal (index) directamente */}
                <Route index element={<Home />} />

                {/* Rutas hijas sin usar index */}
                <Route path="space/:spaceId" element={<SpaceDetail />} />
                <Route path="meeting-rooms" element={<MeetingRooms />} />
                <Route path="dedicated-desk" element={<DedicatedDesk />} />
                <Route path="full-offices" element={<FullFloorOffice />} />
                <Route path="event" element={<Events />} />
                <Route path="private-offices" element={<PrivateOffice />} />
                <Route
                    path="products"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <Products />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="categories"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <Categories />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="list-products"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ListProducts />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="list-categories"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ListCategories />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="list-users"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ListUsers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="edit-products"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <EditProducts />
                        </ProtectedRoute>
                    }
                />
                <Route path="access-denied-products" element={<AccessDeniedProducts />} />

                {/* Redirección para cualquier otra ruta no encontrada */}
                <Route path="/*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    );
};
