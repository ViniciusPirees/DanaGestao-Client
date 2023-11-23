import jwt_decode from "jwt-decode"

export default function setLogin(props) {
   
    var tokenD = jwt_decode(props)
    if (tokenD.logged) {   
        sessionStorage.setItem('token', props)
        return true
    }
    return false
}
