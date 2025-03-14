import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Calendar from "../../components/Calendar";
import { useNavigate } from "react-router-dom";

function SearchForm() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(keyword, selectedDate);
        const params = new URLSearchParams();
        if (keyword !== "") params.set("keyword", keyword);
        if (selectedDate) params.set("date", selectedDate.toISOString().split("T")[0]);
        navigate({ search: params.toString() });
    };

    return (
        <form className="mt-4 flex items-center rounded-full bg-white px-2 py-3">
            <div className="ml-6 mr-2 flex flex-1 flex-col">
                <label htmlFor="keyword" className="text-sm leading-4">
                    Ubicación
                </label>
                <input
                    type="text"
                    name="keyword"
                    placeholder="Busca espacios por país / ciudad"
                    className="outline-none"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
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
