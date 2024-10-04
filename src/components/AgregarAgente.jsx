import { useState } from "react";

const AgregarAgente = ({handleAgregar}) => {
  const [agregar, setAgregar] = useState(false);
  const [valores, setValores] = useState({
    displayName: "",
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    setAgregar(!agregar)
    console.log("Envio", valores);
    handleAgregar(valores)
  };
  const handleValores = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value,
     
    });

  };

  return (
    <div className="mb-2 max-h-[500px] min-h-[200ox] h-[50px] flex justify-center">
      <button
        className="border-solid border-2 rounded-md py-[5px] px-[6px] hover:bg-blue-600 transition-all duration-150 hover:p-3 hover:text-lg bg-blue-500 text-white"
        onClick={() => setAgregar(!agregar)}
      >
        Agregar Personaje
      </button>
      {agregar && (
        <div className="bg-white p-4 rounded-md shadow-md fixed z-50 flex justify-end flex-col gap-2">
          <form action="" onSubmit={handelSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              className="border-solid border-2 rounded-md w-full p-2 mb-2"
              value={valores.displayName}
              onChange={handleValores}
              name="displayName"
            />

            <button
              type="submit"
              className="border-solid border-2 rounded-md bg-blue-400 text-white p-1 hover:bg-blue-500"
            >
              Agregar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AgregarAgente;
