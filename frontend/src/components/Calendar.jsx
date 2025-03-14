import { useState } from "react";
import { DayPicker, defaultLocale, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

function Calendar({ updateSelectedDate }) {
    const [selected, setSelected] = useState();
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

    const handleSelect = (day) => {
        setSelected(day);
        updateSelectedDate(day);
    };

    return (
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
            onSelect={handleSelect}
        />
    );
}
export default Calendar;
