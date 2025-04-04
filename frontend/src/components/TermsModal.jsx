import { AiOutlineClose } from "react-icons/ai";

const TermsModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] overflow-hidden">
                {/* Botón de cerrar */}
                <div className="sticky -top-4 -right-4 flex justify-end p-4 z-10">
                    <button
                        onClick={onClose}
                        className=" text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-300 transition"
                    >
                        <AiOutlineClose className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 text-gray-700 text-sm space-y-4 max-h-[70vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">Términos y Condiciones</h2>
                    <h5 className="text-gray-400 mb-3">Última actualización: 18/03/2025</h5>
                    <h3 className="font-bold mb-3">1. Introducción</h3>
                    <p className="text-justify mb-12">
                        Bienvenido a Cowork, una plataforma que conecta a propietarios de espacios de coworking con
                        profesionales que buscan espacios de trabajo flexibles. Estos Términos y Condiciones rigen el uso de
                        nuestro sitio web, aplicaciones móviles y servicios relacionados. <br />
                        Al acceder o utilizar nuestros servicios, usted acepta estar sujeto a estos términos. Si no está de acuerdo
                        con alguna parte de estos términos, no podrá acceder o utilizar nuestros servicios.
                    </p>
                    <hr />
                    <h3 className="font-bold mt-3 mb-3">2. Cuentas de Usuario</h3>
                    <p className="text-justify mb-12">
                        Para utilizar muchas de las funciones de Cowork, debe registrarse y mantener una cuenta activa. Al crear
                        una cuenta, debe proporcionar información precisa y completa. Usted es responsable de mantener la
                        seguridad de su cuenta y contraseña. <br />
                        Cowork no será responsable por ninguna pérdida o daño derivado de su incumplimiento de esta obligación
                        de seguridad. Debe notificarnos inmediatamente de cualquier uso no autorizado de su cuenta. <br />
                        Nos reservamos el derecho de cerrar su cuenta en cualquier momento por cualquier motivo razonable,
                        incluyendo, pero no limitado a, el incumplimiento de estos Términos y Condiciones.
                    </p>
                    <hr />
                    <h3 className="font-bold mb-3 mt-3">3. Reservas y Pagos</h3>
                    <p className="text-justify">
                        Al realizar una reserva a través de Cowork, usted acepta pagar todas las tarifas y cargos aplicables según
                        lo establecido durante el proceso de reserva. Todos los pagos se procesarán a través de nuestros
                        proveedores de servicios de pago de terceros.
                        Las tarifas de reserva pueden incluir:
                    </p>
                    <div className="ml-4 mb-2">
                        <li>Tarifa base por el espacio de coworking.</li>
                        <li>Tarifas por servicios adicionales seleccionados.</li>
                        <li>Impuestos aplicables.</li>
                        <li>Tarifa de servicio de Cowork.</li>
                    </div>
                    <p className="mb-12">Los precios y la disponibilidad están sujetos a cambios hasta que se complete la reserva.</p>
                    <hr />
                    <h3 className="font-bold mb-3 mt-3">4. Política de Cancelación</h3>
                    <p className="text-justify mb-12">
                        Las políticas de cancelación pueden variar según el espacio de coworking. La política de cancelación
                        específica aplicable a su reserva se mostrará antes de completar su reserva. <br />
                        En general, las cancelaciones realizadas con al menos 48 horas de anticipación pueden ser elegibles para
                        un reembolso parcial o total, dependiendo de la política del espacio específico. <br />
                        Cowork se reserva el derecho de retener las tarifas de servicio en caso de cancelación por parte del
                        usuario.
                    </p>
                    <hr />
                    <h3 className="font-bold mb-3 mt-3">5. Responsabilidades del Usuario</h3>
                    <p className="text-justify mb-2">
                        Como usuario de Cowork, usted acepta:
                    </p>
                    <div className="ml-4 mb-2">
                        <li>Utilizar los espacios de coworking de manera responsable y profesional.</li>
                        <li>Respetar las reglas y políticas específicas de cada espacio.</li>
                        <li>No dañar o alterar las instalaciones o equipos.</li>
                        <li>No participar en actividades ilegales o perturbadoras.</li>
                        <li>Proporcionar información precisa al crear perfiles y realizar reservas.</li>
                        <li>No infringir los derechos de propiedad intelectual de Cowork o de terceros.</li>
                    </div>
                    <p className="mb-12">El incumplimiento de estas responsabilidades puede resultar en la terminación de su cuenta y posibles
                        acciones legales.</p>
                    <hr />
                    <h3 className="font-bold mb-3 mt-3">6. Responsabilidades de la Empresa</h3>
                    <p className="text-justify mb-2">
                        Cowork se compromete a:
                    </p>
                    <div className="ml-4 mb-2">
                        <li>Proporcionar una plataforma funcional para conectar a usuarios con espacios de coworking.</li>
                        <li>Verificar razonablemente la información proporcionada por los propietarios de espacios.</li>
                        <li>Procesar pagos de manera segura.</li>
                        <li>Proporcionar soporte al cliente para resolver problemas.</li>
                        <li>Mantener medidas de seguridad razonables para proteger la información del usuario.</li>
                    </div>
                    <p className="mb-12">Sin embargo, Cowork actúa principalmente como un intermediario y no puede garantizar la calidad,
                        seguridad o idoneidad de todos los espacios listados en nuestra plataforma.</p>
                    <hr />
                    <h3 className="font-bold mb-3 mt-3">7. Propiedad Intelectual</h3>
                    <p className="text-justify mb-12">
                        Todo el contenido presente en la plataforma Cowork, incluyendo pero no limitado a textos, gráficos,
                        logotipos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de
                        Cowork o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual. <br />
                        No puede reproducir, distribuir, modificar, crear trabajos derivados, exhibir públicamente, realizar
                        públicamente, republicar, descargar, almacenar o transmitir cualquier material de nuestra plataforma sin el
                        consentimiento previo por escrito de Cowork.
                    </p>
                    <hr />
                    <h3 className="font-bold mb-3 mt-3">8. Limitación de Responsabilidad</h3>
                    <p className="text-justify">
                        En la máxima medida permitida por la ley aplicable, Cowork no será responsable por daños indirectos,
                        incidentales, especiales, consecuentes o punitivos, o cualquier pérdida de beneficios o ingresos, ya sea
                        incurrida directa o indirectamente, o cualquier pérdida de datos, uso, buena voluntad, u otras pérdidas
                        intangibles.
                    </p>
                    <p className="mt-2 mb-2">Cowork no será responsable por: </p>
                    <div className="ml-4 mb-12">
                        <li>Cualquier inexactitud en la información proporcionada por los propietarios de espacios.</li>
                        <li>La conducta, en línea o fuera de línea, de cualquier usuario de nuestra plataforma.</li>
                        <li>Cualquier interrupción o cese de transmisión a o desde nuestra plataforma.</li>
                        <li>Cualquier virus, troyano u otro material malicioso que pueda ser transmitido a través de nuestra
                            plataforma.</li>
                    </div>
                    <hr />
                    <h3 className="font-bold mb-3 mt-3">9. Política de Privacidad</h3>
                    <p className="text-justify mb-12">
                        Nuestra Política de Privacidad, que describe cómo recopilamos, usamos y compartimos su información
                        personal, se incorpora por referencia a estos Términos y Condiciones. <br />
                        Al utilizar Cowork, usted consiente las prácticas descritas en nuestra Política de Privacidad.
                    </p>
                    <hr />
                    <h3 className="font-bold mb-3 mt-3">10. Cambios a los Términos</h3>
                    <p className="text-justify mb-12">
                        Cowork se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Le
                        notificaremos de cualquier cambio publicando los nuevos Términos y Condiciones en esta página y/o a
                        través de un correo electrónico. <br />
                        Los cambios entrarán en vigor inmediatamente después de su publicación. Su uso continuado de la
                        plataforma después de la publicación de los Términos y Condiciones modificados constituye su aceptación
                        de los cambios.
                    </p>
                    <hr />
                    <h3 className="font-bold mb-3 mt-3">11. Ley Aplicable</h3>
                    <p className="text-justify mb-12">
                        Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de [País/Estado], sin
                        tener en cuenta sus disposiciones sobre conflictos de leyes. <br />
                        Cualquier disputa relacionada con estos términos será sometida a la jurisdicción exclusiva de los tribunales
                        de [Ciudad/Estado].
                    </p>
                    <hr />
                    <h3 className="font-bold mb-3 mt-3">12. Contacto</h3>
                    <p className="text-justify">
                        Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos:
                    </p>
                    <div className="ml-4 mb-12">
                        <li>Por correo electrónico: info@cowork.com</li>
                        <li>Por teléfono: [Número de teléfono]</li>
                        <li>Por correo postal: [Dirección postal]</li>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-[#F43F5E] text-white rounded-md"
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;