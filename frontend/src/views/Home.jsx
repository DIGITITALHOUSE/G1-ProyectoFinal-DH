import { useState } from "react";
import { CategoriesAndRecommended } from "./sectionCategories/CategoriesAndRecommended";
import { SearchBar } from "./sectionSearchAndCalendar/SearchBar";
import { CoworkingList } from "../components/CoworkingList";

export const Home = () => {
    const [searchLocation, setSearchLocation] = useState("");

    return (
        <>
            <CategoriesAndRecommended />
            <SearchBar setSearchLocation={setSearchLocation} />
            <div className="mt-6 px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Espacios de Coworking</h2>
                <CoworkingList searchLocation={searchLocation} />
            </div>
        </>
    );
};
