import axios from "axios";

export async function getProducts(id) {
  const url = `${process.env.REACT_APP_API_URL}/${id ? id : ""}`;
  const response = await axios.get(url);

  return response.data;
}
