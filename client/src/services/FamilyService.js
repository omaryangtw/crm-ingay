import api from './api.js';

export default {
  create(relation) {
    return api().post('family', relation);
  },
  remove(sourceId, targetId) {
    return api().delete(`family/${sourceId}/${targetId}`);
  },
};
