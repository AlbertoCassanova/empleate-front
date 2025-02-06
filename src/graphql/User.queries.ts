import { gql } from '@apollo/client'

export const GET_USER = gql`
    query User($email: String, $password: String) {
        user(email: $email, password: $password) {
            code
            msg
            token
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($nombre: String, $apellido: String, $email: String, $password: String) {
        createUser(nombre: $nombre, apellido: $apellido, email: $email, password: $password) {
            code
            msg
        }
    }
`