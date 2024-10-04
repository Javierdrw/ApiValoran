import BotonAgregar from "./BotonAgregar"


const CardPersonajes = ({src, title, roll}) => {
    

    return(

        <div className="min-h-[378px] border-solid border-2 relative group">
        <div className="bg-slate-950">

          <img
            src={src !== "" ? src : "https://media.vandal.net/m/11-2021/202111179573254_1.jpg.webp"}
            alt={title}
            className="h-80 object-cover w-full shadow-[3px_3px_1px_rgba(0,0,0,0.9)] transition-opacity duration-300 group-hover:opacity-25"
          />

          <div className="absolute inset-0 flex flex-col gap-2 pb-20 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <BotonAgregar src={src} title={title} roll={roll}/>
            <div className="flex justify-center"> 
            <button className="bg-amber-500 font-bold py-6 px-10 shadow-[3px_3px_1px_rgba(0,0,0,0.9)] rounded-br-lg rounded-tl-lg  ">
              READ MORE
            </button>

            </div>
          </div>
        </div>
        <h2 className="font-bold text-xl p-2 text-start">Name: {title}</h2>
        <h2 className="text-xl font-bold p-2 text-start">Roll: {roll}</h2>
        <div className="bg-red-600 w-[10px] h-[10px] flex justify-end absolute bottom-0 right-0"></div>
      </div>
    )

}


export default CardPersonajes