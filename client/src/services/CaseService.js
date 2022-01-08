import api from './api.js';

export default {
  index(search) {
    return api().get('case', {
      params: {
        search: search,
      },
    });
  },
  byClient(ClientId) {
    return api().get(`case/by-client/${ClientId}`);
  },
  dailyCount() {
    return api().get(`case/daily-count`);
  },
  create(serviceCase) {
    return api().post('case', serviceCase);
  },
  put(case__) {
    return api().put(`case/${case__.id}`, case__);
  },
  get(id) {
    return api().get(`case/${id}`);
  },
  remove(id) {
    return api().delete(`case/${id}`);
  },
};
