import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useLocation } from "react-router-dom";
import WhyChooseUs from "../WhyChooseUs";

export const BookingLayout = () => {
    const location = useLocation();
    const pathsToShowWhyChooseUs = ["/", "/auth/login", "/auth/register"];
    const shouldShowWhyChooseUs =
        pathsToShowWhyChooseUs.includes(location.pathname) || location.pathname.startsWith("/space/");
    return (
        <div className="flex min-h-screen flex-col">
            <Header showUserInformation={location.pathname.includes("auth") ? false : true} />
            <main className="flex-1 p-4">
                <Outlet />
            </main>
            {shouldShowWhyChooseUs && <WhyChooseUs />}
            <Footer />
        </div>
    );
};
