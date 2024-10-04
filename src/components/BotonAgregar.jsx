const BotonAgregar = ({ src, title, roll }) => {
  const handleFavorito = () => {
    const equipo = JSON.parse(localStorage.getItem("equipo")) || [];

    const index = equipo.findIndex((element) => element.title === title);

    let nuevoEquipo;
    if (index === -1) {
      if (equipo.length < 5) {
        nuevoEquipo = [...equipo, { src, title, roll }];
        localStorage.setItem("equipo", JSON.stringify(nuevoEquipo));
      }else{
        alert("Solo Puedes Escoger a 5 Personajes")
      }
    } else {
      nuevoEquipo = equipo.filter((element) => element.title !== title);
      localStorage.setItem("equipo", JSON.stringify(nuevoEquipo));
    }

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="w-full flex justify-center">
      <button
        className="bg-amber-500 font-bold py-2 w-fil px-4 shadow-[3px_3px_1px_rgba(0,0,0,0.9)] flex justify-center rounded-br-lg rounded-tl-lg"
        onClick={handleFavorito}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="text-2xl"
        >
          <g fill="none" fillRule="evenodd">
            <path
              fill="currentColor"
              d="M16 14a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default BotonAgregar;
