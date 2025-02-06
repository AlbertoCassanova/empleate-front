const Navbar = () : JSX.Element => {
    return (
        <div className="bg-blue-500 p-2 shadow-md">
            <input 
                type="search"
                name="busqueda"
                placeholder="Buscar"
                className="bg-blue-300 rounded-2xl p-1 outline-none pl-2" 
            />
        </div>
    )
}

export default Navbar