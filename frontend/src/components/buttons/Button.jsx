function Button({ text, filled, href }) {
    return (
        <button
            className={`border border-primary rounded-full px-4 py-1 ${filled ? "bg-primary text-white" : "text-black"}`}
            onClick={href ? () => (window.location.href = href) : null}
        >
            {text}
        </button>
    );
}
export default Button;
