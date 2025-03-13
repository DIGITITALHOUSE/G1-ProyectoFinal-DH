import { FaSearch } from "react-icons/fa";
import { DayPicker, defaultLocale, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { useState, useEffect, useRef } from "react";

function SearchForm() {
    const [selected, setSelected] = useState();
    const [open, setOpen] = useState(false);
    const calendarRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) setOpen(false);
        }
        if (open) document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const defaultClassNames = getDefaultClassNames();
    const spanishLocale = {
        localize: {
            ...defaultLocale.localize,
            day: (day) => {
                const days = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
                return days[day];
            },
            month: (month) => {
                const months = [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre",
                ];
                return months[month];
            },
        },
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
                    value={selected ? selected.toLocaleDateString() : ""}
                />
                {open && (
                    // Componetizar?
                    <div
                        ref={calendarRef}
                        className="absolute left-0 top-10 z-10 mt-6 rounded-2xl bg-white p-4 shadow-lg"
                    >
                        <DayPicker
                            classNames={{
                                root: `${defaultClassNames.root}`,
                                today: "text-black",
                                selected: "bg-black text-white rounded-full",
                                chevron: "text-black",
                                caption_label: `${defaultClassNames.caption_label} pl-3`,
                            }}
                            animate
                            mode="single"
                            locale={spanishLocale}
                            weekStartsOn={1}
                            selected={selected}
                            onSelect={setSelected}
                        />
                    </div>
                )}
            </div>
            <div
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-red-500 shadow-md transition-all hover:bg-red-600"
                role="button"
            >
                <FaSearch className="text-lg text-white" size={16} />
            </div>
        </form>
    );
}
export default SearchForm;
