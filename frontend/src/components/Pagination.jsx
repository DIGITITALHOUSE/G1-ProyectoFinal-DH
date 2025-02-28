import PropTypes from "prop-types";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null; // No mostrar si solo hay una página

  return (
    <div className="flex justify-center mt-6">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 sm:px-4 sm:py-2 mx-1 text-sm sm:text-base bg-gray-300 rounded disabled:opacity-50"
            >
            ⬅ Anterior
        </button>

        {[...Array(totalPages)].map((_, index) => (
        <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 sm:px-4 sm:py-2 mx-1 text-sm sm:text-base rounded ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
        >
            {index + 1}
        </button>
        ))}

        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 sm:px-4 sm:py-2 mx-1 text-sm sm:text-base bg-gray-300 rounded disabled:opacity-50"
            >
            Siguiente ➡
        </button>

    </div>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
