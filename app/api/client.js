import { create } from "apisauce";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "http://192.168.0.11:9000/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = authStorage.getUserToken();
  //if (!authToken) return console.log("NO AUTH TOKEN");
  request.headers["x-auth-token"] = authToken;
});

export default apiClient;
