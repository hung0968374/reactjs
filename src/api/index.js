import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/features/authen/authenSlice";

const API = axios.create({
  baseURL: "https://fwa-ec-quiz.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  const userToken = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.auth
  )?.otherInfos?.tokens?.access?.token;
  if (userToken) {
    req.headers.Authorization = `Bearer ${userToken}`;
  }
  return req;
});

export const api_login = (userInfo) => API.post(`/v1/auth/login`, userInfo);
export const api_register = (userInfo) => {
  console.log("userInfo", userInfo);
  return API.post(`/v1/auth/register`, userInfo);
};
export const api_getQuestions = () => API.get(`/v1/auth/login`);
