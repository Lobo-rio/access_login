import axios from 'axios'

export const http = axios.create({
  baseURL: "http://localhost:8081/app/users",
  timeout: 1000,
  headers: {"Access-Control-Allow-Origin": "*"},
  mode: "cors"
})