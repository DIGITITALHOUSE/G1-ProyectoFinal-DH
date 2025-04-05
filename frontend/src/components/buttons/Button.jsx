function Button({ text, filled, href }) {
    return (
      <button
        className={`border border-primary rounded-full px-4 py-1 transition-colors duration-300
          ${filled
            ? "bg-primary text-white dark:bg-primary dark:text-white"
            : "text-black dark:text-white border-primary dark:border-white"}
        `}
        onClick={href ? () => (window.location.href = href) : null}
      >
        {text}
      </button>
    );
}

export default Button;
