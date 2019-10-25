import axios from 'axios'
const queryString = require('query-string');

const config = {

    URL:`http://192.168.88.86/v1`,
    options:{
        headers:{
            "Content-type":"application/x-www-form-urlencoded",
            "accept": "application/json"
        }
    }

}

export const login = (userData) => {
    axios.post('url/login', {email: userData.email, password: userData.password})
        .then(res => res.json())
        .then(response => response)
        .catch(err => console.log(err))
}

export const register = async (userData) => {
    let req = await axios.post(config.URL + '/register/', queryString.stringify(userData), config.options)
    return req.data.data
}