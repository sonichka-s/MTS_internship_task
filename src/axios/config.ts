import axios from "axios";

export const CHARACTER_URL = "/api/character";

export const $url = axios.create({
  baseURL: "https://rickandmortyapi.com",
});
