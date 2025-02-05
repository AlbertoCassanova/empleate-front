import { gql } from '@apollo/client'

export const GET_USER = gql`
    query User($email: String, $password: String) {
        user(email: $email, password: $password) {
            email
            password,
            nombre,
            apellido
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($user: inputUser) {
        createUser(user: $user) {
            code
            msg
        }
    }
`