import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { eyesSkincareProductService } from './eyesSkincareProductService';



export const fetchAllProducts = createAsyncThunk(
    "eyes-skincare-product/get", 
     async (data, thunkAPI) => {
    try{
        return await eyesSkincareProductService.getProducts(data);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getAProduct = createAsyncThunk(
    "eyes-skincare-product/getAProduct", 
     async (id,thunkAPI) => {
    try{
        return await eyesSkincareProductService.getSingleProduct(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const addToWishlistProduct = createAsyncThunk(
    "eyes-skincare-product/wishlist", 
     async (prodId,thunkAPI) => {
    try{
        return await eyesSkincareProductService.addToWishlist(prodId);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const addRating = createAsyncThunk(
    "eyes-skincare-product/rating", 
     async (data,thunkAPI) => {
    try{
        return await eyesSkincareProductService.rateProduct(data);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

const eyesSkincareProductState = {
    product:"",
    isError:false,
    isSuccess:false, 
    isLoading:false,
    message:"",
};
    
export const eyesSkincareproductSlice = createSlice({
    name:"product",
    initialState:eyesSkincareProductState, 
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchAllProducts.pending,(state) =>{
            state.isLoading = true;
        }).addCase(fetchAllProducts.fulfilled,(state,action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
            console.log(action.payload);
        }).addCase(fetchAllProducts.rejected,(state,action)=>{
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

export default eyesSkincareproductSlice.reducer;

