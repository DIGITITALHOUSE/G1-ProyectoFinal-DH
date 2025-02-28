import ImageGallery from "../ImageGallery";
import BookingPanel from "../BookingPanel";

// DetailLayout.jsx
const DetailLayout = ({ children, space }) => {
  if (!space) return null;

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <div className="w-full">
        <ImageGallery images={space.images || []} />
      </div>

      {/* Contenedor Flex para la Descripción y el Panel de Reserva */}
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <div className="md:w-2/3">{children}</div>
        <div className="md:w-1/3 flex justify-end"> {/* Alinea el BookingPanel a la derecha */}
          <BookingPanel price={space.price} />
        </div>
      </div>
    </div>
  );
};


export default DetailLayout;

  
