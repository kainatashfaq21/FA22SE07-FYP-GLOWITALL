import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice" ;
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pCategoryReducer from "../features/pCategory/pCategorySlice";
import bCategoryReducer from "../features/bCategory/bCategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import colorReducer from "../features/color/colorSlice";
import uploadReducer from "../features/upload/uploadSlice";



export const store = configureStore({
    reducer:{ 
        auth:authReducer,
        customer:customerReducer,
        product:productReducer,
        brand:brandReducer,
        pCategory:pCategoryReducer,
        blogs:blogReducer,
        bCategory:bCategoryReducer,
        color:colorReducer,
        upload: uploadReducer,
    },
});
