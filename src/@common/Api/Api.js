import { Config } from "../config/config"
import token from "../storage/token"
import authActions from '../../services/auth/authActions'
import store from '../../store/store'

const apiUrl = Config.get("API_URL")

class Api {
  get(url, params) {
    url = new URL(`${apiUrl}${url}`)
    if (params)
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      )
    return fetch(url, {
      method: "GET",
      headers: new Headers({
        'Authorization': `Bearer ${token.getToken()}`,
      }),
    })
      .then(async (response) => {
        if(response.status === 401){
          store.dispatch(authActions.logOut())
          return response
        }
        return { ok: response.ok, res: await response.json() }
      })
      .catch((err) => err)
  }

  post(url, data) {
    let isFormData = data instanceof FormData 

    url = new URL(`${apiUrl}${url}`)
    return fetch(url, {
      method: "POST",
      headers: isFormData ? 
        new Headers({ "Authorization": `Bearer ${token.getToken()}` }) 
        : 
        new Headers({
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": `Bearer ${token.getToken()}`
        }),
      body: isFormData ? data : JSON.stringify(data),  
    })
      .then(async (response) => {
        if(response.status === 401){
          store.dispatch(authActions.logOut())
          return response
        }
        return { ok: response.ok, res: await response.json() }
      })
      .catch((err) => err)
  }

  put(url, id, data) {
    let isFormData = data instanceof FormData

    url = new URL(`${apiUrl}${url}/${id}`)
    return fetch(url, {
      method: "PUT",
      headers: isFormData ? 
        new Headers({"Authorization": `Bearer ${token.getToken()}`}) 
        : 
        new Headers({
          "Accept": "application/json", 
          "Content-type": "application/json",
          "Authorization": `Bearer ${token.getToken()}` 
        }),
      body: isFormData ? data : JSON.stringify(data),   
    })
      .then(async (response) => {
        if(response.status === 401){
          store.dispatch(authActions.logOut())
          return response
        }
        return { ok: response.ok, res: await response.json() }
      })
      .catch((err) => err)
  }

  delete(url, id) {
    url = new URL(`${apiUrl}${url}/${id}`)
    return fetch(url, {
      method: "DELETE",
      headers: new Headers({
        "Authorization": `Bearer ${token.getToken()}` 
      }),
    })
      .then(async (response) => {
        if (response.status === 401){
          store.dispatch(authActions.logOut())
          return response
        }
        return { ok: response.ok, res: await response.json() }
      })
      .catch((err) => err)
  }

  convertFormData(data){
    let dataBody = new FormData()
    Object.keys(data).forEach(key => {
      if(!Array.isArray(data[key])){
        const isFile = data[key] && data[key].size
        const isJson = typeof data[key] === 'object'
        dataBody.append(key, isFile || !isJson ? data[key] : JSON.stringify(data[key]) )
      }else{
        data[key].forEach(item => dataBody.append(key, item))
      }
    })
    return dataBody
  }
}

export default new Api()
