import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const createBlogCategory = async (bcat) => {
  const response = await axios.post(`${base_url}blogcategory/`, bcat, config);
  return response.data;
};

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`);
  return response.data;
};

const updateBlogCat = async (blogCat) => {
  console.log(blogCat);
  const response = await axios.put(
    `${base_url}blogcategory/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);

  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getBlogCategory,
  updateBlogCat,
  deleteCategory,
};

export default bCategoryService;
