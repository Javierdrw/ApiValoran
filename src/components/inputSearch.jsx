const InputSearch = ( { search, handelSearch}) =>{

    return (

        <div>

            <input type="text"  onChange={(text) => handelSearch(text.target.value)} value={search}  placeholder="Buscar Personaje" className="border-solid border-2 rounded-md w-48 p-2" />

        </div>
    )

}


export default InputSearch;