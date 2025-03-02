import { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineExclamationCircle, AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai";

const CenteredMessage = ({ type, message, isOpen, onClose, onConfirm, duration = 3000 }) => {
    const [visible, setVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            if (type !== "confirm") {
                const timer = setTimeout(() => {
                    setVisible(false);
                    onClose(); // 🔹 Aseguramos que el modal se cierre después del tiempo
                }, duration);
                return () => clearTimeout(timer);
            }
        } else {
            setVisible(false);
        }
    }, [isOpen, type, onClose, duration]);

    if (!visible) return null;

    const handleConfirm = () => {
        if (onConfirm) onConfirm(); // Ejecuta la acción de confirmación
        setVisible(false); // 🔹 Cierra el modal
        onClose(); // 🔹 Llama a onClose para actualizar el estado del padre
    };

    const handleClose = () => {
        setVisible(false); // 🔹 Cierra el modal
        onClose(); // 🔹 Llama a onClose para actualizar el estado del padre
    };

    const typeStyles = {
        success: "bg-gray-100 text-black",
        error: "bg-gray-100 text-black",
        warning: "bg-gray-100 text-black",
        info: "bg-gray-100 text-black",
        confirm: "bg-gray-100 text-black",
    };

    const icons = {
        success: <AiOutlineCheckCircle className="text-green-300 text-6xl" />,
        error: <AiOutlineCloseCircle className="text-red-300 text-6xl" />,
        warning: <AiOutlineExclamationCircle className="text-yellow-300 text-6xl" />,
        info: <AiOutlineInfoCircle className="text-blue-300 text-6xl" />,
        confirm: <AiOutlineQuestionCircle className="text-gray-500 text-6xl" />,
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className={`p-6 rounded-lg shadow-lg max-w-md w-full text-center ${typeStyles[type]} transform transition-all duration-300`}>
                <div className="flex justify-center mb-2">{icons[type]}</div>
                <p className="text-lg mt-3">{message}</p>

                <div className="mt-4 flex justify-center space-x-3">
                    {type === "confirm" ? (
                        <>
                            <button onClick={handleConfirm} className="px-4 py-2 bg-[#F43F5E] text-white rounded">
                                Aceptar
                            </button>
                            <button onClick={handleClose} className="px-4 py-2 bg-gray-400 text-white rounded">
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <button onClick={handleClose} className="px-4 py-2 bg-gray-700 text-white rounded">
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CenteredMessage;
