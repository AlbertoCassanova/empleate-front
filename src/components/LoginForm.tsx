import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '../graphql/User.queries';
import { useState } from 'react';

const LoginForm = () => {
    const [signupView, setSignupView] = useState<boolean>(false)
    const [getUser, { error }] = useLazyQuery(GET_USER);

    // Form state
    // @ts-ignore
    const [firstName, setFirstName] = useState<string>('');
    // @ts-ignore
    const [lastName, setLastName] = useState<string>('');
    const [inputEmail, setInputEmail] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    // @ts-ignore
    const [verifyPassword, setVerifyPassword] = useState<string>('');

    const handleLogin = async() => {
        const g = await getUser({variables: {email: inputEmail, password: inputPassword}})
        console.log(g.data.user);
        if (error) {
            alert("Ha ocurrido un error")
        }
        if (g.data.user.length == 0) {
            alert("Usuario o contraseña incorrecto")
        }
        else {
            localStorage.setItem("usuario", "admin");
            window.location.href = "/home"
        }
    }
    return (
        <div>
            {
                !signupView ? (
                    <form className='flex flex-col'>
                        <h2>Iniciar sesión</h2>
                        <input type="text" placeholder='Correo Electrónico' onChange={(e) => setInputEmail(e.target.value)} />
                        <input type="password" placeholder='Contraseña' onChange={(e) => setInputPassword(e.target.value)} />
                        <span>
                            <button type='button' onClick={handleLogin}>Entrar</button>
                        </span>
                        <span>¿No estas registrado?
                            <a onClick={() => setSignupView(!signupView)}> Registrate</a>
                        </span>
                    </form>
                ) : (
                    <form className='flex flex-col'>
                        <h2>Registrarse</h2>
                        <input type="text" placeholder='Nombre' onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" placeholder='Apellido' onChange={(e) => setLastName(e.target.value)} />
                        <input type="text" placeholder='Correo Electrónico' onChange={(e) => setInputEmail(e.target.value)} />
                        <input type="password" placeholder='Contraseña' onChange={(e) => setInputPassword(e.target.value)} />
                        <input type="password" placeholder='Confirmar contraseña' onChange={(e) => setVerifyPassword(e.target.value)} />
                        <span>¿Ya estas registrado?
                            <a className='cursor-pointer' onClick={() => setSignupView(!signupView)}> Inciar sesión</a>
                        </span>
                    </form>
                )
            }
        </div>
    )
}

export default LoginForm