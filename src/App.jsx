import "./App.css";
import CardPersonajes from "./components/CardPersonajes";
import { useEffect, useState } from "react";
import Filtros from "./components/filtros";
import AgregarAgente from "./components/AgregarAgente";
import Equipo from "./components/Equipo";

function App() {
  const [dataPersonajes, setDataPersonajes] = useState([]);
  const [text, setText] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [filtroPersonajesApi, setFiltroPersonajesApi] = useState([]);
  const [personajesAgregadosArray, setPersonajesAgregadosArray] = useState([]);
  const [personajesAgregados, setPersonajesAgregados] = useState(0);
  const [textoCero, setTextoCero] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const agentesPorPágina = 6;

  const totalPages = Math.ceil(filtroPersonajesApi.length / agentesPorPágina);

  const obtenerPersonajesCombinados = () => {
    return [...dataPersonajes, ...personajesAgregadosArray];
  };

  const filtrarPorTexto = (data) => {
    return data?.filter((p) =>
      p.displayName.toLowerCase().includes(text.toLowerCase())
    );
  };

  const filtrarPorRol = (data) => {
    if (selectedRoles.length > 0) {
      return data?.filter((p) =>
        selectedRoles.includes(p.role?.displayName?.toLowerCase())
      );
    }
    return data;
  };

  const superFiltro = () => {
    let dataFiltrada = obtenerPersonajesCombinados();
    dataFiltrada = filtrarPorTexto(dataFiltrada);
    dataFiltrada = filtrarPorRol(dataFiltrada);
    setFiltroPersonajesApi(dataFiltrada);
    setTextoCero(dataFiltrada.length === 0);
    setCurrentPage(1);
  };

  const handelSearch = (e) => {
    setText(e);
  };

  const handelRoll = (role, checked) => {
    setSelectedRoles((prevRoles) =>
      checked
        ? [...prevRoles, role.toLowerCase()]
        : prevRoles.filter((r) => r !== role.toLowerCase())
    );
  };

  const handleAgregar = (nuevoPersonaje) => {
    if (personajesAgregados < 5) {
      const nuevoPersonajeConId = {
        ...nuevoPersonaje,
        uuid: personajesAgregadosArray.length + 1,
        displayIcon:
          "https://media.vandal.net/m/11-2021/202111179573254_1.jpg.webp",
      };
      setPersonajesAgregadosArray([
        ...personajesAgregadosArray,
        nuevoPersonajeConId,
      ]);
      setPersonajesAgregados((prev) => prev + 1);
    } else {
      alert("Has superado el número de personajes permitidos, que son 5.");
    }
  };

  const índiceDelÚltimoAgente = currentPage * agentesPorPágina;
  const índiceDelPrimerAgente = índiceDelÚltimoAgente - agentesPorPágina;
  const agentesactuales = filtroPersonajesApi.slice(
    índiceDelPrimerAgente,
    índiceDelÚltimoAgente
  );

  const siguientePagina = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginaAnterior = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    superFiltro();
  }, [text, selectedRoles, dataPersonajes, personajesAgregadosArray]);

  useEffect(() => {
    fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
      .then((response) => response.json())
      .then((data) => setDataPersonajes(data.data));
  }, []);

  return (
    <div>
      <Equipo />
      <div className="flex justify-between">
        <Filtros
          search={text}
          handelSearch={handelSearch}
          api={dataPersonajes}
          handelRoll={handelRoll}
        />
        <AgregarAgente handleAgregar={handleAgregar} />
      </div>
      {textoCero && (
        <h3 className="text-center text-3xl">
          No hay resultados que coincidan con tu búsqueda
        </h3>
      )}

      <div className="grid grid-cols-4 gap-4">
        {agentesactuales.map((p) => (
          <CardPersonajes
            key={p.uuid}
            src={p.displayIcon}
            title={p.displayName}
            roll={p.role?.displayName}
          />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button onClick={paginaAnterior} className="px-4 py-2 mx-2 bg-gray-300">
          Anterior
        </button>
        <div className="flex gap-2 h-fit my-auto">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`w-fit px-2 p-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-slate-300"
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>
        <button
          onClick={siguientePagina}
          className="px-4 py-2 mx-2 bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default App;
