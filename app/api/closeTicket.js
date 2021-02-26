import client from "./client";

const endpoint = "/status";

const closeTicket = (items) => client.put(endpoint, items);

export default {
  closeTicket,
};
