import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: `http://192.168.1.219:3001`,
  });
};
