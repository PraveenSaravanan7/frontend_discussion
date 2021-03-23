import axios from 'axios';
const ls = require("local-storage")
var accessToken = ls("accessToken")
export default axios.create({
  baseURL: `https://salty-everglades-84208.herokuapp.com/`,
  //baseURL: `http://localhost:8000/`,
  timeout: 3000,
  headers: { 'Authorization': 'Bearer ' + accessToken }
});