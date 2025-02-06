const HomeView = () : JSX.Element => {
    document.title = "Empleate";

    /**
     * Función usada para cerrar sesión
     */
    const Logout = () : void => {
        localStorage.removeItem("token");
        window.location.href = "/"
    }
    return (
        <div>
            <button onClick={Logout}>Cerrar sesión</button>
        </div>
    )
}

export default HomeView