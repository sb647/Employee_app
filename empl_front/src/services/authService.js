import axios from 'axios'

const URL = "http://localhost:8080/api/auth/login"

class AuthService {


  login(mail, pass) {
    const data = {
        email: mail,
        password: pass
    };
    return axios.post(URL, data).then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user" , JSON.stringify(response.data));
          alert("OK!");
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();