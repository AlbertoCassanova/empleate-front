// React
import { useState } from 'react';

// Apollo Graphql
import { OperationVariables, useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_USER, GET_USER } from '../../graphql/User.queries';

// Utils
import { translateServerMessage } from '../../utils/translate';
import { validateSignup } from '../../utils/validator';

const LoginForm = (): JSX.Element => {
    // View state
    const [signupView, setSignupView] = useState<boolean>(false);

    // Alert state
    const [containerMessage, setContainerMessage] = useState<boolean>(false);
    const [textContainerMessage, setTextContainerMessage] = useState<string>("");

    // Graphql queries
    const [getUser, { error }] = useLazyQuery<any, OperationVariables>(GET_USER);
    const [createUser] = useMutation(CREATE_USER);

    // Form state
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [inputEmail, setInputEmail] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const [verifyPassword, setVerifyPassword] = useState<string>('');

    /**
     * Función de inicio de sesión
     */
    const handleLogin = async (): Promise<void> => {
        const g = await getUser({ variables: { email: inputEmail, password: inputPassword } })
        if (error) {
            setTextContainerMessage("Ha ocurrido un error");
            setContainerMessage(true);
        }
        if (g.data.user.length == 0) {
            setTextContainerMessage("Usuario o contraseña incorrecto");
            setContainerMessage(true);
        }
        else {
            localStorage.setItem("token", g.data.user[0].token);
            window.location.href = "/home"
        }
    }

    /**
     * Crear un nuevo usuario
     */
    const handleSignUp = async (): Promise<void> => {
        const validation = validateSignup(firstName, lastName, inputEmail, inputPassword, verifyPassword);
        if (validation.validtion) {
            const createUserResult = await createUser({
                variables: {
                    nombre: firstName,
                    apellido: lastName,
                    email: inputEmail,
                    password: inputPassword
                }
            });
            switch (createUserResult.data.createUser[0].code) {
                case 200:
                    alert("Se ha registrado el usuario exitosamente");
                    window.location.href = '/';
                    break;
                case 400:
                    let mensaje = translateServerMessage({ lang: 'es', msg: createUserResult.data.createUser[0].msg });
                    setTextContainerMessage(mensaje);
                    setContainerMessage(true);
                    break;
                default:
                    break;
            }
        }
        else {
            setTextContainerMessage(validation.msg);
            setContainerMessage(true);
        }
    }
    return (
        <div className='flex items-center w-full h-full justify-center'>
            <form className='flex flex-col bg-blue-500 p-4 rounded-lg shadow-xl'>
                {
                    !signupView ? (
                        <>
                            <h2 className='text-center text-white text-2xl'>Iniciar sesión</h2>
                            <input
                                className='auth-input'
                                autoComplete="off"
                                type="text"
                                placeholder='Correo Electrónico'
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                            <input
                                className='auth-input'
                                autoComplete="off"
                                type="password"
                                placeholder='Contraseña'
                                onChange={(e) => setInputPassword(e.target.value)}
                            />
                            <span className='self-center'>
                                <button className='bg-indigo-800 text-white p-1 rounded-md' type='button' onClick={handleLogin}>Entrar</button>
                            </span>
                            <span>¿No estas registrado?
                                <a
                                    className='cursor-pointer hover:underline'
                                    onClick={() => {
                                        setSignupView(!signupView);
                                        setContainerMessage(false);
                                    }}
                                >
                                    {" "}Registrate
                                </a>
                            </span>
                        </>
                    ) : (
                        <>
                            <h2 className='text-center text-white text-2xl'>Registrarse</h2>
                            <input
                                className='auth-input'
                                autoComplete='off'
                                type="text"
                                placeholder='Nombre'
                                name='nombre'
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                className='auth-input'
                                autoComplete='off'
                                type="text"
                                placeholder='Apellido'
                                name='apellido'
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <input
                                className='auth-input'
                                autoComplete='off'
                                type="text"
                                placeholder='Correo Electrónico'
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                            <input
                                className='auth-input'
                                autoComplete='off'
                                type="password"
                                placeholder='Contraseña'
                                onChange={(e) => setInputPassword(e.target.value)}
                            />
                            <input
                                className='auth-input'
                                autoComplete='off'
                                type="password"
                                placeholder='Confirmar contraseña'
                                onChange={(e) => setVerifyPassword(e.target.value)}
                            />
                            <span className='self-center'>
                                <button
                                    onClick={handleSignUp}
                                    className='bg-indigo-800 text-white p-1 rounded-md'
                                    type='button'
                                >
                                    Registrarse
                                </button>
                            </span>
                            <span>¿Ya estas registrado?
                                <a
                                    className='cursor-pointer hover:underline'
                                    onClick={() => {
                                        setSignupView(!signupView);
                                        setContainerMessage(false)
                                    }}
                                >
                                    {" "}Inciar sesión
                                </a>
                            </span>
                        </>
                    )
                }
                <div className={`bg-red-500 rounded-md p-1 my-1 ${containerMessage ? 'visible' : 'hidden'}`}>
                    <span className='text-white'>{textContainerMessage}</span>
                </div>
            </form>
        </div>
    )
}

export default LoginForm