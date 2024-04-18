import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const createProducts = async (data) => {
  const response = await axios.post(`${base_url}product/`, data, config);
  return response.data;
};
const productService = {
  getProducts,
  createProducts,
};

export default productService;
