import axios from "axios";

/*
const key = `v1?apiKey=at_7Fg7l3CZwn1WtmVmsYkplaiylGt29&ipAddress`;

const api = axios.create({
  baseURL: `https://geo.ipify.org/api`,
});

export { api, key };
*/

const key = `3774ffb622bc3ee6eecbb6826b60d628`;

const api = axios.create({
  baseURL: "https://extreme-ip-lookup.com/json/",
});

const countrieFlagApi = axios.create({
  baseURL: "https://restcountries.eu/rest/v2/alpha/",
});

export { api, countrieFlagApi };
