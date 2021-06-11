import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://localhost:8080/yeokku",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Content-Type": "application/json; charset = utf-8",
  },
});
