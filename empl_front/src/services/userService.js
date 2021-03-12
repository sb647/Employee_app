import axios from 'axios';
import authHeader from './authHeader';

const URL = 'http://localhost:8080/api/role/';

class UserService {
  getPublicContent() {
    return axios.get(URL + 'all');
  }

  getUserBoard() {
    return axios.get(URL + 'user', { headers: authHeader() });
  }

 
  getAdminBoard() {
    return axios.get(URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
