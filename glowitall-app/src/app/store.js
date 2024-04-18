import { configureStore ,getDefaultMiddleware } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/users/userSlice';
import productReducer from '../features/products/productSlice';
import eyesSkincareProductReducer from '../features/eyesSkincareProducts/eyesSkincareProductSlice';
import lipsSkincareProductReducer from '../features/lipsSkincareProducts/lipsSkincareProductSlice';
import blogReducer from '../features/blogs/blogSlice';


export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    eyesSkincareProduct: eyesSkincareProductReducer,
    lipsSkincareProduct: lipsSkincareProductReducer,

  },
});
