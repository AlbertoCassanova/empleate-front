// React
import { useEffect, useState } from 'react';

// Components
import LoginForm from '../components/auth/LoginForm';

const AuthView = () : JSX.Element => {
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
        <div className='flex w-full h-full'>
            <LoginForm />
        </div>
    )
}

export default AuthView