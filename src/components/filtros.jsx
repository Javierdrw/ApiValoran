
import InputSearch from "./inputSearch";
import Roll from "./Roll";

const Filtros = ({search, handelSearch, api, handelRoll} ) =>{

    return (

        <div className="mb-5 flex justify-between w-2/3">
            <InputSearch search={search} handelSearch={handelSearch} />
            <Roll api={api}  handelRoll={handelRoll} />

        </div>

    )

}


export default Filtros;