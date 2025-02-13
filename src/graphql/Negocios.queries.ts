import { gql } from "@apollo/client";

export const GET_NEGOCIOS = gql`
    query GetNegocios($token: String) {
        getNegocios(token: $token) {
            cantidad
            negocio {
                id
                nombre
                verificado
            }
        }
    }
`

export const CREATE_NEGOCIO = gql`
    mutation CreateNegocio($token: String, $negocio: NegocioInput) {
        createNegocio(token: $token, negocio: $negocio) {
            code
            msg
        }
    }
`