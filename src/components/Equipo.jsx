import { useState, useEffect } from "react";
import BotonQuitar from "./BotonQuitar";

const Equipo = () => {
  const [action, setAction] = useState(false);
  const [equipos, setEquipo] = useState(JSON.parse(localStorage.getItem("equipo")) || []);

  const handleQuitar = (personaje) => {
    const nuevoEquipo = equipos.filter((element) => element.title !== personaje);
    console.log('personaje a quitar', personaje);

    setEquipo(nuevoEquipo);
    localStorage.setItem("equipo", JSON.stringify(nuevoEquipo));
  };

  useEffect(() => {
    const actualizarEquipo = () => {
      setEquipo(JSON.parse(localStorage.getItem("equipo")) || []);
    };

    window.addEventListener("storage", actualizarEquipo);

    return () => {
      window.removeEventListener("storage", actualizarEquipo);
    };
  }, []);

  return (
    <div className="fixed top-5 right-5 border-solid border-2 rounded-md p-2 bg-violet-900 text-white opacity-20 hover:opacity-100 cursor-pointer z-50">
      <button onClick={() => setAction(!action)}>Equipo</button>

      {action && (
        <>
          <div className="opacity-100 w-[90vw] h-4/5 grid grid-cols-5 gap-3 cente">
            {equipos.map((p) => (
              <div className="min-h-[378px] border-solid border-2 relative group" key={p.title}>
                <div className="bg-slate-950">
                  <img
                    src={p.src}
                    alt={p.title}
                    className="h-80 object-cover w-full shadow-[3px_3px_1px_rgba(0,0,0,0.9)] transition-opacity duration-300 group-hover:opacity-25"
                  />
                  <div className="absolute inset-0 flex flex-col gap-2 pb-20 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <BotonQuitar title={p.title} handleQuitar={handleQuitar} />
                    <div className="flex justify-center">
                      <button className="bg-amber-500 font-bold py-6 px-10 shadow-[3px_3px_1px_rgba(0,0,0,0.9)] rounded-br-lg rounded-tl-lg">
                        READ MORE
                      </button>
                    </div>
                  </div>
                </div>
                <h2 className="font-bold text-xl p-2 text-start">Name: {p.title}</h2>
                <h2 className="text-xl font-bold p-2 text-start">Roll: {p.roll}</h2>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <button
              onClick={() => setAction(!action)}
              className="p-2 bg-red-600 text-white rounded-md"
            >
              Clouse
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Equipo;
