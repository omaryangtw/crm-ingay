import api from "./api.js";

export default {
  index(search) {
    return api().get("client", {
      params: {
        search: search,
      },
    });
  },
  create(client) {
    return api().post("client", client);
  },
  put(client) {
    return api().put(`client/${client.id}`, client);
  },
  get(id) {
    return api().get(`client/${id}`);
  },
  indexAll() {
    return api().get("client/all");
  },
  remove(id) {
    return api().delete(`client/${id}`);
  },
};
