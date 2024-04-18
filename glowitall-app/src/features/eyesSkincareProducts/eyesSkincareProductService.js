import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';


const getProducts = async (data) => {
    console.log(data);
    const response = await axios.get(`${base_url}eyes-skincare-product?${data?.brand?`brand=${data?.brand}&&`:""}${data?.tag?`tags=${data?.tag}&&`:""}${data?.category?`category=${data?.category}&&`:""}`);
    if(response.data){
        return response.data;
    }
}

const getSingleProduct = async (id) => {
    const response = await axios.get(`${base_url}eyes-skincare-product/${id}`);
    if(response.data){
        return response.data;
    }
}

const addToWishlist = async (prodId) => {
    const response = await axios.put(`${base_url}eyes-skincare-product/wishlist`,{prodId},config);
    if(response.data){
        return response.data;
    }
}

const rateProduct = async (data) => {
    const response = await axios.put(`${base_url}eyes-skincare-product/rating`, data, config);
    if(response.data){
        return response.data;
    }
}

export const eyesSkincareProductService = {
    getProducts,
    getSingleProduct,
    addToWishlist,
    rateProduct,
}
