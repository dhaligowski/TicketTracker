import client from "./client";

const endpoint = "/ticket";

const getTicket = (id) => client.get(`${endpoint}/${id}`);

const updateTicket = (data) => client.put(endpoint);

export default {
  getTicket,
  updateTicket,
};
