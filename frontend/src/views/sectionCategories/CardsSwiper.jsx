import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import "swiper/css";
import { getAllSpaceTypes } from "../../services/spaceTypeService"; 
import { Navigation, Pagination } from "swiper/modules";

const images = [
    "https://dicode.com/wp-content/uploads/2016/06/reuniones-3.jpg",
    "https://img.freepik.com/foto-gratis/estudiantes-tiro-completo-que-estudian-interior_23-2149647036.jpg",
    "https://sillaoficina365.es/img/cms/BLOG/JUNIO/03/imagen-2.jpg",
    "https://ambientesterza.com/app/blog/331b3436775f40b08996859d32132236_nota.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO4ihjyxKEAftNT-WiCZqSF_OtUnEXt5H2sQ&s",
];

const CardsSwiper = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        getAllSpaceTypes().then((data) => {
            const updatedCategories = data.map((category, index) => ({
                ...category,
                img: images[index % images.length],
            }));
            setCategories(updatedCategories);
        });
    }, []);

    const handleCategoryClick = (id) => {
        const params = new URLSearchParams(window.location.search);
        params.set("spaceType", id);  
        navigate(`?${params.toString()}`); 
    };
    

    return (
        <div className="relative w-full flex items-center">
            <IoIosArrowDropleft className="absolute prev-slide cursor-pointer text-neutral-800 hover:text-primary left-0 text-3xl z-50 -translate-x-10 hidden sm:block" />
            <Swiper
                className="w-full"
                modules={[Navigation, Pagination]}
                navigation={{ nextEl: ".next-slide", prevEl: ".prev-slide" }}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 15 },
                    1024: { slidesPerView: 4, spaceBetween: 15 },
                }}
            >
                {categories.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        className="px-1 cursor-pointer"
                        onClick={() => handleCategoryClick(item.id)}
                    >
                        <div className="rounded-2xl overflow-hidden group">
                            <img
                                src={item.img}
                                alt={`Imagen de ${item.name}`}
                                className="w-full h-40 object-cover object-center transition-transform group-hover:scale-105 ease-in-out duration-200"
                            />
                            <div className="bg-neutral-800 h-12 flex justify-center items-center text-white group-hover:bg-secondary ease-in-out duration-200">
                                <h3 className="text-lg font-medium">{item.name}</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <IoIosArrowDropright className="absolute next-slide cursor-pointer text-neutral-800 hover:text-primary right-0 text-3xl z-50 translate-x-10 hidden sm:block" />
        </div>
    );
};

export default CardsSwiper;
