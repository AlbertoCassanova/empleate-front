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

export const UPDATE_NEGOCIO_LOCATION = gql`
    mutation UpdateNegocioLocation($longitude: Float, $latitude: Float, $businessId: Int, $token: String) {
        updateNegocioLocation(longitude: $longitude, latitude: $latitude, businessId: $businessId, token: $token) {
            code
            msg
        }
    }
`