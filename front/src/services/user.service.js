import axios from "axios";

const API_URL = "http://localhost:4000/api/verify/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};






const UserService = {
  getPublicContent,
  
}

export default UserService;
