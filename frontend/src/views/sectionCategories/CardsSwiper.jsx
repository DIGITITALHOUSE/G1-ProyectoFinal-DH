import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

// DATA HARCODEADA
export const data = [
    {
        id: 1,
        img: "https://dicode.com/wp-content/uploads/2016/06/reuniones-3.jpg",
        category: "Salas de reuniones",
        name: "Salas de reuniones",
    },
    {
        id: 2,
        img: "https://img.freepik.com/foto-gratis/estudiantes-tiro-completo-que-estudian-interior_23-2149647036.jpg",
        category: "Eventos",
        name: "Eventos",
    },
    {
        id: 3,
        img: "https://sillaoficina365.es/img/cms/BLOG/JUNIO/03/imagen-2.jpg",
        category: "Oficinas",
        name: "Oficinas",
    },
    {
        id: 4,
        img: "https://ambientesterza.com/app/blog/331b3436775f40b08996859d32132236_nota.jpg",
        category: "Piso de Oficinas",
        name: "Piso de Oficinas",
    },
    {
        id: 5,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO4ihjyxKEAftNT-WiCZqSF_OtUnEXt5H2sQ&s",
        category: "Escritorios",
        name: "Escritorios",
    },
];

const CardsSwiper = () => {
    return (
        <Swiper
            className="relative"
            modules={[Navigation, Pagination]}
            // esto es para poder ponerle una clase a cualquier elemnto y que tenga la funcionalidad de siguiente y previo
            navigation={{
                nextEl: ".next-slide",
                prevEl: ".prev-slide",
            }}
            // es para que sea infinito
            // loop
            // es para que aparezcan las pelotitas de la paginacion
            pagination={{
                // para que pueda  clickear en las pelotitas
                clickable: true,
            }}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }}
        >
            {data.map((item) => (
                <SwiperSlide key={item.id}>
                    <div className="cursor-pointer rounded-2xl overflow-hidden mx-10 group ">
                        <Link to={item.category}>
                            <img
                                src={item.img}
                                alt="imagen referente a la categoria"
                                //  cambiar el tamanio a gusto
                                className="w-full h-40 object-cover object-center transition-transform group-hover:scale-105 ease-in-out duration-200"
                            />
                            <div className=" bg-neutral-800 h-12 flex justify-center  items-center text-white group-hover:bg-secondary ease-in-out duration-200">
                                <h3 className="text-lg font-medium">
                                    {item.name}
                                </h3>
                            </div>
                        </Link>
                    </div>
                    {/* <SkeletonCardsSweiper /> */}
                </SwiperSlide>
            ))}
            <div
                className="flex gap-2 w-full justify-center mt-5
            "
            >
            </div>
            <IoIosArrowDropleft className="absolute prev-slide cursor-pointer text-neutral-800 hover:text-primary top-1/2 z-10 left-2 text-2xl  transform -translate-y-1/2 ease-in-out duration-200 hidden sm:block" />

            <IoIosArrowDropright className="absolute next-slide cursor-pointer text-neutral-800 hover:text-primary z-10 top-1/2 right-2 text-2xl  transform -translate-y-1/2 ease-in-out duration-200 hidden sm:block" />
        </Swiper>
    );
};
export default CardsSwiper;