// Función para generar un color aleatorio basado en el nombre
const getRandomColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.floor((hash & 0x00FFFFFF) | 0x1000000).toString(16).slice(1, 7);
  return `#${color}`;
};

const Avatar = ({ username }) => {
  // Obtiene la inicial del nombre del usuario
  const initial = username ? username.charAt(0).toUpperCase() : '';
  // Genera el color de fondo
  const backgroundColor = getRandomColor(username);

  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-full text-white text-lg border-2 border-gray-300"
      style={{ backgroundColor: backgroundColor }}
    >
      {initial}
    </div>
  );
};

export default Avatar;