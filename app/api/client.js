import { create } from "apisauce";
import authStorage from "../auth/storage";
import settings from "../config/settings";

const apiClient = create({
  //baseURL: "http://192.168.x.xx:9000/api",
  baseURL: settings.apiURL,
  //baseURL: settings.apiUrl,
  //"https://afternoon-spire-84745.herokuapp.com/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = authStorage.getUserToken();
  //if (!authToken) return console.log("NO AUTH TOKEN");
  request.headers["x-auth-token"] = authToken;
});

export default apiClient;
