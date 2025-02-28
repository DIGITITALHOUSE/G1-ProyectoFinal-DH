const BookingPanel = ({ price }) => {
    return (
        <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">{price}/día</h2>
            <p className="text-gray-600 mt-2">¿Cuándo quieres reservar?</p>
            <input type="date" className="w-full p-2 border rounded mt-2" />
            <input type="date" className="w-full p-2 border rounded mt-2" />
            <button className="bg-blue-500 text-white w-full p-2 rounded mt-4">Reservar</button>
        </div>
    );
};


export default BookingPanel;
