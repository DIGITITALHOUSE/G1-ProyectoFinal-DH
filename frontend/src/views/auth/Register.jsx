import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import CenteredMessage from "../../components/MessageDialog";

export const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ isOpen: false, type: "info", message: "", onConfirm: null });
    const showMessage = (type, message, onConfirm = null) => {
        setMessage({ isOpen: true, type, message, onConfirm });
    };
    const [isFormValid, setIsFormValid] = useState(false);
    const closeMessage = () => {
        setMessage((prev) => ({ ...prev, isOpen: false })); // 🔹 Cierra el mensaje correctamente
    };
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        avatar: null,
        termsAccepted: false,
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        termsAccepted: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, avatar: files[0] });
        } else if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        validateField(name, type === "file" ? files[0] : type === "checkbox" ? checked : value);
    };

    const validateField = (name, value) => {
        let errorMessage = "";

        switch (name) {
            case "firstName":
            case "lastName":
                { const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,}$/;
                errorMessage = nameRegex.test(value)
                    ? ""
                    : "Solo letras y mínimo 2 caracteres";
                break; }

            case "email":
                { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                errorMessage = emailRegex.test(value) ? "" : "Correo inválido";
                break; }

            case "phone":
                { const phoneRegex = /^[0-9]{9,15}$/;
                errorMessage = phoneRegex.test(value)
                    ? ""
                    : "Número inválido (9-15 dígitos)";
                break; }

            case "password":
                { const passwordRegex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
                errorMessage = passwordRegex.test(value)
                    ? ""
                    : "Mayúscula, minúscula, número, carácter especial y mínimo 8 caracteres";
                break; }

            case "termsAccepted":
                errorMessage = value ? "" : "Debes aceptar los términos y condiciones";
                break;

            default:
                break;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
          }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true)
            /*if (!formData.termsAccepted) {
                alert("Debes aceptar los términos y condiciones.");
                return;
            }
            const formDataToSend = new FormData();
            formDataToSend.append("firstName", formData.firstName);
            formDataToSend.append("lastName", formData.lastName);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("phone", formData.phone);
            formDataToSend.append("password", formData.password);
            if (formData.avatar) {
                formDataToSend.append("avatar", formData.avatar);
            }*/
            const requestData = {
                name: formData.firstName,
                lastName: formData.lastName,
                avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : "", // Enviar como string (base64 o URL)
                email: formData.email,
                password: formData.password,
                cellPhone: parseInt(formData.phone, 10), // Convertir a número
                state: "Activo", // Puedes cambiar esto si el API lo requiere
              };

            try {
                //const response = await createUser(formDataToSend);
                const response = await fetch("https://api-cowork.iriscompany.io/auth/register", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                  });
            
                  //const data = await response.json();
                if (response.ok) {
                    showMessage('success', 'Registro exitoso, inicie sesión')
                    setTimeout(() => {
                        navigate("/auth/login", { replace: true });
                      }, 3000);
                } else {
                    showMessage('error', 'Error al registrar usuario')
                }
            } catch (error) {
                console.error("Error al registrar:", error);
                showMessage('error', 'Hubo un problema con el registro')
            } finally {
                setLoading(false)
            }
        };

        useEffect(() => {
            const allFieldsFilled = Object.entries(formData)
            .filter(([key]) => key !== "avatar") // Avatar no se incluye
            .every(([, value]) => (typeof value === "boolean" ? value : value.trim() !== ""));

            const noErrors = Object.values(errors).every((error) => error === "");
        
            setIsFormValid(allFieldsFilled && noErrors);
          }, [formData, errors]);

        return (
            <>
                <div className="flex flex-col items-center justify-center w-full -mb-3.5">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-8">
                        <h2 className="text-2xl font-bold text-center">Bienvenido a Cowork</h2>
                        <p className="text-center text-gray-500 mb-4">Únete a nuestra comunidad de trabajo colaborativo</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex gap-2">
                                <div className="w-1/2">
                                    <label className="text-sm font-medium">Nombre</label>
                                    <input type="text" name="firstName" placeholder="Tu nombre"  className={`w-full p-2 border rounded ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                                     onChange={handleChange} required />
                                     {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                                </div>
                                <div className="w-1/2">
                                    <label className="text-sm font-medium">Apellido</label>
                                    <input type="text" name="lastName" placeholder="Tu apellido" className={`w-full p-2 border rounded ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                                     onChange={handleChange} required />
                                     {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                                </div>
                            </div>

                            {/* Avatar */}
                            <div className="flex items-center gap-4">
                                {formData.avatar ? (
                                    <img src={URL.createObjectURL(formData.avatar)} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                        <span className="text-gray-500 text-sm">Avatar</span>
                                    </div>
                                )}
                                <label className="bg-gray-300 px-3 py-1 rounded cursor-pointer text-sm">
                                    Cambiar avatar
                                    <input type="file" name="avatar" className="hidden" onChange={handleChange} />
                                </label>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Correo electrónico</label>
                                <input type="email" name="email" placeholder="ejemplo@correo.com" className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                 onChange={handleChange} required />
                                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium">Celular</label>
                                <input type="tel" name="phone" placeholder="Número celular" className={`w-full p-2 border rounded ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                                 onChange={handleChange} required />
                                 {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium">Contraseña</label>
                                <input type="password" name="password" placeholder="Mínimo 8 caracteres" className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                 onChange={handleChange} required minLength="8" />
                                 {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            {/* Checkbox de términos */}
                            <div className="flex items-center">
                                <input type="checkbox" name="termsAccepted" className="mr-2" onChange={handleChange} />
                                <label className="text-sm">Acepto los términos y condiciones y la política de privacidad</label>
                            </div>
                            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

                            {/* Botón de registro */}
                            <button
                                type="submit"
                                className={`w-full mt-6 px-4 py-2 text-white rounded-full transition ${
                                    isFormValid ? "bg-[#F43F5E] hover:bg-[#E11D48]" : "bg-gray-400 cursor-not-allowed"
                                  }`}
                                  disabled={!isFormValid}
                            >
                                Crear cuenta
                            </button>

                            <p className="text-center text-sm mt-2">
                                ¿Ya tienes una cuenta? <a href="/auth/login" className="text-[#F43F5E]">Inicia sesión</a>
                            </p>
                        </form>
                    </div>
                </div>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white p-6 rounded-lg flex flex-col items-center">
                            <svg className="animate-spin h-8 w-8 text-[#F43F5E]" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                            <p className="mt-2 text-gray-700">Registrando...</p>
                        </div>
                    </div>
                )}
                <CenteredMessage
                    isOpen={message.isOpen}
                    type={message.type}
                    message={message.message}
                    onClose={closeMessage}
                    onConfirm={() => {
                        if (message.onConfirm) message.onConfirm();
                        closeMessage();
                    }}
                />
            </>
        );
    };

