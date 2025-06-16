import axios from "axios";

const api =axios.create({
    baseURL:'https://api.hgbrasil.com/weather?format=json-cors&key=efc21dd3&user_ip=remote'
})

export default api