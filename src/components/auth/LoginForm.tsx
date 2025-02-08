// React
import { useState } from 'react';

// Apollo Graphql
import { OperationVariables, useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN_USER } from '../../graphql/User.queries';

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
    const [getUser] = useLazyQuery<any, OperationVariables>(LOGIN_USER);
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
        if (g.error) {
            setTextContainerMessage("Ha ocurrido un error");
            setContainerMessage(true);
        }
        else {
            if (g.data.loginUser.length == 0) {
                setTextContainerMessage("Usuario o contraseña incorrecto");
                setContainerMessage(true);
            }
            else {
                localStorage.setItem("token", g.data.loginUser[0].token);
                window.location.href = "/home"
            }
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
        <>
            <div className="my-12 border-b text-center">
                <div
                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
                >
                    {signupView ? "Registrarse" : "Iniciar sesión"}
                </div>
            </div>
            <div className="mx-auto max-w-xs">
                <form>
                    {
                        !signupView ? (
                            <>
                                <h2 className='text-center text-white md:text-2xl text-3xl font-medium'>Iniciar sesión</h2>
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
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={handleLogin}
                                    type='button'
                                >
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-">
                                        Entrar
                                    </span>
                                </button>
                                <div className="mt-6 text-sm text-gray-600 text-center">
                                    <span>¿No estas registrado?</span>
                                    <a
                                        className='cursor-pointer hover:underline'
                                        onClick={() => {
                                            setSignupView(!signupView);
                                            setContainerMessage(false);
                                        }}
                                    >
                                        {" "}Registrate
                                    </a>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className='text-center text-white md:text-2xl text-3xl font-medium'>Registrarse</h2>
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
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={handleSignUp}
                                    type='button'
                                >
                                    <span className="ml-">
                                        Registrarse
                                    </span>
                                </button>
                                <div className="mt-6 text-sm text-gray-600 text-center">
                                    <span>¿Ya estas registrado?</span>
                                    <a
                                        className='cursor-pointer hover:underline'
                                        onClick={() => {
                                            setSignupView(!signupView);
                                            setContainerMessage(false);
                                        }}
                                    >
                                        {" "}Inciar sesión
                                    </a>
                                </div>
                            </>
                        )
                    }
                    <div className={`bg-red-500 rounded-md p-1 my-1 ${containerMessage ? 'visible' : 'hidden'}`}>
                        <span className='text-white'>{textContainerMessage}</span>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginForm