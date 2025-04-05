import { AiFillCheckCircle, AiFillClockCircle, AiFillSafetyCertificate } from "react-icons/ai";

function WhyChooseUs() {
  return (
    <div className="mt-20 flex w-screen flex-col bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <div className="mt-5 text-center">
        <p className="text-3xl font-bold">¿Por qué elegir Cowork?</p>
      </div>
      <div className="mb-8 mt-8 flex flex-col gap-8 lg:flex-row items-center justify-between text-center px-4">
        <div className="flex flex-1 flex-col items-center">
          <AiFillCheckCircle className="text-4xl text-[#F43F5E]" />
          <p className="font-semibold">Espacios verificados</p>
          <p className="max-w-xs text-sm text-gray-700 dark:text-gray-300">
            Todos nuestros espacios son verificados para poder garantizar la mejor calidad
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <AiFillClockCircle className="text-4xl text-[#F43F5E]" />
          <p className="font-semibold">Reserva Flexible</p>
          <p className="max-w-xs text-sm text-gray-700 dark:text-gray-300">
            Reserva por hora según tus necesidades
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <AiFillSafetyCertificate className="text-4xl text-[#F43F5E]" />
          <p className="font-semibold">100% seguro</p>
          <p className="max-w-xs text-sm text-gray-700 dark:text-gray-300">
            Pagos seguros y soporte 24/7 para tu tranquilidad
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
