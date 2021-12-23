import api from './api.js';

export default {
  search(search) {
    return api().get('/contact', {
      params: {
        search: search,
      },
    });
  },
  create(record) {
    return api().post('contact', record);
  },
  remove(clientId, recordId) {
    return api().delete(`contact/${clientId}/${recordId}`);
  },
  update(record) {
    return api().patch(`contact/${record?.id}`, record);
  },
  recent() {
    return api().get('/contact/recent');
  },
  sinceThisWeek() {
    return api().get('/contact/since-this-week');
  },
  historyContact() {
    return api().get('/contact/history');
  },
  index() {
    return api().get('/contact/all');
  },
};
