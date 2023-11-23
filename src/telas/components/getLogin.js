import jwt_decode from "jwt-decode";


export default async function getLogin() {
    if (sessionStorage.getItem('token')) {
        var token = jwt_decode(sessionStorage.getItem('token'))
      
        if (token.logged) {
            return ({val: true, n: token.nivel, nome: token.nome, login: token.login, cod: token.usucod})
        }
    }
    return false
}
