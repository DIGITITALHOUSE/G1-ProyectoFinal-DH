import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Calendar from "../../components/Calendar";
import { useNavigate } from "react-router-dom";
import { getSpacesRecommendations } from "../../services/spaceService";
import { FaMapMarkerAlt } from "react-icons/fa";

function SearchForm() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [listRecommendations, setListRecommendations] = useState([]);
    const [recommendationSelected, setRecommendationSelected] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [open, setOpen] = useState(false);
    const calendarRef = useRef();

    const updateSelectedDate = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) setOpen(false);
        }
        if (open) document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleOnClickKeyword = (e) => {
        setRecommendationSelected(e.target.innerText);
        setKeyword(e.target.innerText);
        setListRecommendations([]);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (keyword !== "" && selectedDate === undefined) {
                getSpacesRecommendations(keyword).then((res) => {
                    setListRecommendations(res);
                });
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [keyword, selectedDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (recommendationSelected === keyword && keyword !== "") params.set("keyword", keyword);
        if (selectedDate) params.set("date", selectedDate.toISOString().split("T")[0]);
        navigate({ search: params.toString() });
    };

    return (
        <form className="mt-4 flex items-center rounded-full bg-white px-2 py-3">
            <div className="relative ml-6 mr-2 flex flex-1 flex-col">
                <label htmlFor="keyword" className="text-sm leading-4">
                    Ubicación
                </label>
                <input
                    type="text"
                    name="keyword"
                    autoComplete="off"
                    placeholder="Busca espacios por país / ciudad"
                    className="outline-none"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {listRecommendations.length > 0 && (
                    <ul className="absolute left-0 top-10 z-10 mt-6 max-h-48 w-full overflow-y-scroll rounded-2xl bg-white p-4 shadow-lg">
                        {listRecommendations.map((recommendation, index) => (
                            <li
                                key={index}
                                onClick={handleOnClickKeyword}
                                className="cursor-pointer rounded px-3 py-2 text-lg hover:bg-gray-100"
                            >
                                <FaMapMarkerAlt className="mr-2 inline-block" size={16} />
                                {recommendation}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="h-10 w-px bg-gray-300"></div>
            <div className="relative ml-6 mr-2 flex flex-1 cursor-pointer flex-col" onClick={() => setOpen(true)}>
                <label htmlFor="date" className="cursor-pointer text-sm leading-4">
                    Fecha
                </label>
                <input
                    readOnly
                    type="text"
                    name="date"
                    placeholder="¿Cuándo te gustaría agendar tu espacio?"
                    className="cursor-pointer caret-transparent outline-none"
                    value={selectedDate ? selectedDate.toLocaleDateString() : ""}
                />
                <div
                    ref={calendarRef}
                    className={`absolute left-0 top-10 z-10 mt-6 rounded-2xl bg-white p-4 shadow-lg transition-opacity duration-300 ease-in-out ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
                >
                    <Calendar updateSelectedDate={updateSelectedDate} />
                </div>
            </div>
            <button
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-red-500 shadow-md transition-all hover:bg-red-600"
                onClick={handleSubmit}
            >
                <FaSearch className="text-lg text-white" size={16} />
            </button>
        </form>
    );
}
export default SearchForm;
