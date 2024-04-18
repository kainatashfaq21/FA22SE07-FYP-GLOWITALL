import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { lipsSkincareProductService } from './lipsSkincareProductService';


export const fetchAllProductsFromLipsSkincare = createAsyncThunk(
    "lips-skincare-product/get", 
     async (data, thunkAPI) => {
    try{
        return await lipsSkincareProductService.getProducts(data);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getAProduct = createAsyncThunk(
    "lips-skincare-product/getAProduct", 
     async (id,thunkAPI) => {
    try{
        return await lipsSkincareProductService.getSingleProduct(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const addToWishlistProduct = createAsyncThunk(
    "lips-skincare-product/wishlist", 
     async (prodId,thunkAPI) => {
    try{
        return await lipsSkincareProductService.addToWishlist(prodId);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const addRating = createAsyncThunk(
    "lips-skincare-product/rating", 
     async (data,thunkAPI) => {
    try{
        return await lipsSkincareProductService.rateProduct(data);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

const lipsSkincareProductState = {
    product:"",
    isError:false,
    isSuccess:false, 
    isLoading:false,
    message:"",
};
    
export const lipsSkincareproductSlice = createSlice({
    name:"product",
    initialState:lipsSkincareProductState, 
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchAllProductsFromLipsSkincare.pending,(state) =>{
            state.isLoading = true;
        }).addCase(fetchAllProductsFromLipsSkincare.fulfilled,(state,action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
            console.log(action.payload);
        }).addCase(fetchAllProductsFromLipsSkincare.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(addToWishlistProduct.pending,(state) =>{
            state.isLoading = true;
        }).addCase(addToWishlistProduct.fulfilled,(state,action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.addToWishlist = action.payload;
            state.message = "Product added to Wishlist!"
        }).addCase(addToWishlistProduct.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getAProduct.pending,(state) =>{
            state.isLoading = true;
        }).addCase(getAProduct.fulfilled,(state,action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.singleproduct = action.payload;
            state.message = "Product fetched successfully!"
        }).addCase(getAProduct.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(addRating.pending,(state) =>{
            state.isLoading = true;
        }).addCase(addRating.fulfilled,(state,action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.rating = action.payload;
            state.message = "Rating Added successfully!"
            if(state.isSuccess){
                toast.success("Rating Added Successfully!")
            }
        }).addCase(addRating.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        })
    },
});

export default lipsSkincareproductSlice.reducer;

