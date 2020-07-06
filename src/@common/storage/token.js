import jwtDecode from "jwt-decode"

class Token {
  decode = (token) => jwtDecode(token || this.getToken())

  getToken = () => localStorage.getItem("token")

  setToken = (token) => localStorage.setItem("token", token)

  removeToken = () => localStorage.removeItem("token")

  isTokenValid = () => {
    try {
      return this.decode() !== undefined
    } catch (error) {
      return false
    }
  }
}

export default new Token()
