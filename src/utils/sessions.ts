/**
 * Función usada para cerrar sesión
 */
export const Logout = () : void => {
    localStorage.removeItem("token");
    window.location.href = "/"
}