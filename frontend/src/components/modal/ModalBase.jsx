import { AiOutlineClose } from "react-icons/ai";

const ModalBase = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70">
            <div className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
                {/* Botón de cerrar */}
                <div className="sticky -right-4 -top-4 z-10 flex justify-end p-4">
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-800 shadow-lg transition hover:bg-gray-300"
                    >
                        <AiOutlineClose className="h-5 w-5" />
                    </button>
                </div>
                <div className="max-h-[70vh] space-y-4 overflow-y-auto px-8 pb-8 text-sm text-gray-700">{children}</div>
            </div>
        </div>
    );
};

export default ModalBase;
