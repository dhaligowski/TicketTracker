import { create } from "apisauce";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "http://192.168.1.65:9000/api",
  //baseURL: "https://afternoon-spire-84745.herokuapp.com/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = authStorage.getUserToken();
  //if (!authToken) return console.log("NO AUTH TOKEN");
  request.headers["x-auth-token"] = authToken;
});

export default apiClient;
