import client from "./client";

const endpoint = "/tickets";
const getTickets = () => client.get(endpoint);
const updateTicket = (data) => client.put(endpoint, data);
const addNewTicket = (items) => client.post(endpoint, items);

export default {
  getTickets,
  addNewTicket,
  updateTicket,
};
