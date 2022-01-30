import axios from "axios";
export const getApiResource = async (url) => {
  let data;
  await axios.get(url).then((res) => (data = res.data));
  console.log(data)
};
