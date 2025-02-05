const HomeView = () => {
    const Logout = () => {
        localStorage.removeItem("usuario");
        window.location.href = "/"
    }
    return (
        <div>
            <button onClick={Logout}>Cerrar sesión</button>
        </div>
    )
}

export default HomeView