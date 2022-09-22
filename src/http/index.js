import axios from "axios";

const DATA_URL =
  "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json";

export const getMusicData = () => {
  return axios.get(DATA_URL);
};
