import axios from "axios";

export default (url = "https://api.quotable.io/") => {
  return axios.create({
    baseURL: url,
  });
};
