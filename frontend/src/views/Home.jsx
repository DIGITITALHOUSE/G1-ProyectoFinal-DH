import { useState } from "react";
import { CategoriesAndRecommended } from "./sectionCategories/CategoriesAndRecommended";
import { SearchBar } from "./sectionSearchAndCalendar/SearchBar";
import { CoworkingList } from "../components/CoworkingList";

export const Home = () => {
    // Se usarán search params
    // eslint-disable-next-line no-unused-vars
    const [searchLocation, setSearchLocation] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    return (
        <>
            <SearchBar />
            <CategoriesAndRecommended />
            <div className="mt-6 px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Espacios de Coworking</h2>
                <CoworkingList selectedCategory={selectedCategory} searchLocation={searchLocation} />
            </div>
        </>
    );
};
