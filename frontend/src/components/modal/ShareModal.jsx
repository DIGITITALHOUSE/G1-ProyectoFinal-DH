import { FaLink, FaWhatsapp, FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useState } from "react";

const shareOptions = [
    { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://api.whatsapp.com/send?text=" },
    { icon: <FaFacebook />, label: "Facebook", href: "https://www.facebook.com/sharer/sharer.php?u=" },
    { icon: <FaLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/shareArticle?mini=true&url=" },
    { icon: <FaXTwitter />, label: "X", href: "https://x.com/intent/post?text=" },
];

function ShareOption({ icon, label, href, title }) {
    const encodedUrl = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(title);

    const finalHref = label === "Facebook" ? `${href}${encodedUrl}` : `${href}${encodedTitle} ${encodedUrl}`;
    return (
        <a
            className="flex items-center justify-center rounded-full border border-gray-300 py-2 hover:bg-gray-100"
            target="_blank"
            rel="noopener noreferrer"
            href={finalHref}
        >
            {icon}
            <span className="ml-2">{label}</span>
        </a>
    );
}

function ShareModal({ spaceTitle, spaceImage, spaceDescription }) {
    const currentUrl = window.location.href;
    const [copied, setCopied] = useState(false);

    const shareData = {
        title: spaceTitle,
        text: spaceDescription,
        url: currentUrl,
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Error al compartir:", err);
            }
        } else {
            alert("Tu navegador no soporta Web Share API.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <h2 className="text-center text-3xl font-semibold">Compartir</h2>
            <p className="!mt-2 text-center text-gray-600">Comparte este espacio con tus contactos</p>
            <div className="!m-0 pb-4 pt-8">
                <img src={spaceImage} alt={`${spaceTitle} image`} className="w-full rounded-lg" />
            </div>
            <p className="text-2xl text-black">{spaceTitle}</p>
            <p className="text-dark-800 text-gray-700">{spaceDescription}</p>

            {/* ENLACE COPIABLE */}
            <div className="!mt-2 flex items-center gap-2 rounded-lg">
                <FaLink className="text-gray-800" />
                <p className="break-all text-sm text-gray-500">{currentUrl}</p>
            </div>

            {/* OPCIONES DE COMPARTIR */}
            <p>Compartir en:</p>
            <div className="mt-4 grid grid-flow-col gap-3">
                {shareOptions.map((option) => (
                    <ShareOption key={option.label} {...option} title={spaceTitle} />
                ))}
            </div>
            {/* BOTÓN DE COMPARTIR NATIVO */}
            <div className="mt-2 flex flex-col gap-2">
                {navigator.share && (
                    <div className="rounded-full bg-gray-800 py-3">
                        <button onClick={handleShare} className="w-full text-lg text-white">
                            Otras opciones
                        </button>
                    </div>
                )}
                <div className="rounded-full bg-primary py-3">
                    <button onClick={copyToClipboard} className="w-full text-lg text-white">
                        {copied ? "Copiado" : "Copiar enlace"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ShareModal;
