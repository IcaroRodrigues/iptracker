import axios from "axios";

/*
const key = `v1?apiKey=at_7Fg7l3CZwn1WtmVmsYkplaiylGt29&ipAddress`;

const api = axios.create({
  baseURL: `https://geo.ipify.org/api`,
});

export { api, key };


*/
const key = `f3b0cfd291ef4bf3a41f38409ba2c075`;
const api = axios.create({
  baseURL: "https://ipgeolocation.abstractapi.com/v1/",
});

export { api, key };
