import axios from 'axios';


const http = axios.create({
    headers :  {"auth-token": localStorage.getItem("accessToken")}
})

export default http;
