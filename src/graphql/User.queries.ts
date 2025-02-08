import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    query loginUser($email: String, $password: String) {
        loginUser(email: $email, password: $password) {
            code
            msg
            token
        }
    }
`

export const GET_USER_INFO = gql`
    query GetUserInfo($token: String) {
        getUserInfo(token: $token) {
            nombre
            apellido
            email
            sexo
            editado
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

export const UPDATE_USER = gql`
    mutation UpdateUser($newData: updateUserData, $token: String) {
        updateUser(newData: $newData, token: $token) {
            msg
            code
        }
    }
`