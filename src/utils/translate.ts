type translateServerMessageType = {
    lang: 'es' | 'en',
    msg: string
}

/**
 * Esta función traduce los mensajes recibidos por el servidor al idioma seleccionado
 * @param lang - String
 * @param msg - String
 * @returns String
 */
export const translateServerMessage  = ({lang, msg} : translateServerMessageType) : string => {
    switch (msg) {
        case "email must be unique":
            if (lang == 'es') {
                return "Este usuario ya existe";
            }
            else if (lang == 'en') {
                return "This user already exists";
            }
            else {
                return "";
            }
        default:
            return "";
    }
}