import { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'

const AuthView = () => {
    document.title = "Iniciar sesión";
    const [loadingView, setLoadingView] = useState<boolean>(false);
    useEffect(() => {
        if (localStorage.getItem("usuario")) {
            window.location.href = "/home";
        }
        else {
            setLoadingView(true)
        }
    })
    return !loadingView ? (<></>):(
        <div>
            <LoginForm />
        </div>
    )
}

export default AuthView