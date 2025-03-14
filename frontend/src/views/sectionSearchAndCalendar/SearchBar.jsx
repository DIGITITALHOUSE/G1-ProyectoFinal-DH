import Section from '../Section';
import SearchForm from "./SearchForm";

// RENOMBRAR A HeroSection?
export const SearchBar = () => {
  return (
    <Section>
      <div
        className="relative w-full h-96 bg-cover bg-center flex items-center rounded-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXNwYWNpb3MlMjBkZSUyMGNvd29ya2luZ3xlbnwwfHwwfHx8MA%3D%3D')",
        }}
      >

      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

        <div className="relative z-10 max-w-3xl pl-12 text-left">
          <h1 className="text-5xl text-white">
            Encuentra tu espacio ideal para trabajar
          </h1>
          <p className="mt-2 text-lg text-gray-200">
            Descubre espacios de coworking únicos en tu ciudad
          </p>

          <SearchForm />
        </div>
      </div>

    </Section>
  );
};
