type validateSignupType = {
    validtion : boolean,
    msg: string
}

export const validateSignup = (nombre : string, apellido : string, email: string, password: string, validatePassword: string) : validateSignupType  => {
    if (password == validatePassword) {
        if (nombre.match(/[a-zA-Z]+/g) || apellido.match(/[a-zA-Z]+/g)) {
            if (email.includes("@")) {
                return {
                    validtion: true,
                    msg: "OK"
                }
            }
            else {
                return {
                    validtion: false,
                    msg: "Correo inválido"
                }
            }
        }
        else {
            return {
                validtion: false,
                msg: "Nombre o apellido inválido"
            }
        }
    } else {
        return {
            validtion: false,
            msg: "Las contraseñas no coinciden"
        }       
    }
}