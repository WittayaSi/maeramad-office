import jwt from 'jsonwebtoken'

export const getCurrentTimestamp = (digit = 10) => (
    +new Date().getTime().toString().substr(0, digit)
)

export const getExpFromToken = (token) => {
    const { exp } = Object(jwt.decode(token))
    return exp
}