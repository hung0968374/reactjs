import axios from "axios";

const API = axios.create({
  baseURL: "https://fwa-ec-quiz.herokuapp.com/",
});

const LOGIN_ERROR = "Incorrect username or password";

API.interceptors.request.use((req) => {
  const userToken = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.auth
  )?.otherInfos?.tokens?.access?.token;
  if (userToken) {
    req.headers.Authorization = `Bearer ${userToken}`;
  }
  return req;
});

const setNewLocalStorage = (oldAccess, newAccess, oldRefresh, newRefresh) => {
  let currLocalStorage = localStorage.getItem("persist:root");
  currLocalStorage = currLocalStorage.replace(oldAccess, newAccess);
  currLocalStorage = currLocalStorage.replace(oldRefresh, newRefresh);
  localStorage.setItem("persist:root", currLocalStorage);
};

const setAuthFalse = () => {
  let currLocalStorage = JSON.parse(localStorage.getItem("persist:root"));
  let newAuth = JSON.parse(currLocalStorage.auth);
  newAuth.userAuthenticated = false;
  const stringifyNewAuth = JSON.stringify(newAuth);
  currLocalStorage.auth = stringifyNewAuth;
  localStorage.setItem("persist:root", JSON.stringify(currLocalStorage));
};

function createAxiosResponseInterceptor() {
  if (localStorage.length > 0) {
    const userRefreshToken = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root"))?.auth
    )?.otherInfos?.tokens?.refresh?.token;
    const userAccessToken = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root"))?.auth
    )?.otherInfos?.tokens?.access?.token;

    const interceptor = API.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response.status !== 401 ||
          error.response.data.message === LOGIN_ERROR
        ) {
          return Promise.reject(error);
        }

        API.interceptors.response.eject(interceptor);
        return axios
          .post("https://fwa-ec-quiz.herokuapp.com/v1/auth/refresh-tokens", {
            refreshToken: userRefreshToken,
          })
          .then((response) => {
            ///save token
            const newAccessToken = response.data.access.token;
            const newRefreshToken = response.data.refresh.token;
            setNewLocalStorage(
              userAccessToken,
              newAccessToken,
              userRefreshToken,
              newRefreshToken
            );

            error.response.config.headers["Authorization"] =
              "Bearer " + newAccessToken;
            return axios(error.response.config);
          })
          .catch((error) => {
            setAuthFalse();
            window.location.href = "http://localhost:3000";
            return Promise.reject(error);
          })
          .finally(createAxiosResponseInterceptor);
      }
    );
  }
}
createAxiosResponseInterceptor();

export const api_login = (userInfo) => API.post(`/v1/auth/login`, userInfo);
export const api_register = (userInfo) => {
  return API.post(`/v1/auth/register`, userInfo);
};
export const api_getQuestions = () => API.get(`/v1/questions?page=1&limit=100`);
export const api_submitQuestions = (userAnswers) =>
  API.post(`/v1/questions/submit`, userAnswers);
export const api_admin_getQuestions = () => API.get(`/v1/questions/edit`);
export const api_admin_deleteQuestions = (quesId) =>
  API.delete(`/v1/questions/edit/${quesId}`);
export const api_admin_createNewQues = (obj) =>
  API.post(`/v1/questions/edit`, obj);
export const api_admin_updateQues = (id, obj) =>
  API.patch(`/v1/questions/edit/${id}`, obj);
export const api_admin_getUsers = () => API.get(`/v1/users/`);
export const api_admin_createNewUser = (obj) => API.post(`/v1/users/`, obj);
export const api_admin_updateUser = (id, userInfo) =>
  API.patch(`/v1/users/${id}`, userInfo);
