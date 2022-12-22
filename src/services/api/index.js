import axios from 'axios';
import {API} from '../../constants';

export const restauratnListApi = () => {
  return axios.get(API.baseUrls[API.currentEnv] + API.authUrls.restauratnList);
};
