import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";
const getCustomerfromLocalStorage = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;
const initialState = {
  user: getCustomerfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
// Admin login
export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//GetOrders
export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (_, thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getOrderByUser = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "user/profile/update",
  async (data, thunkAPI) => {
    try {
      return await authService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//login
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
        if (state.isSuccess === true) {
          console.log(action.payload.findUser);

          const userdetails = action.payload?.findAdmin;
          if (userdetails) {
            const user = {
              firstname: userdetails.firstname,
              lastname: userdetails.lastname,
              email: userdetails.email,
              role: userdetails.role,
              address: userdetails.address,
              profile : userdetails.profile
            };
            localStorage.setItem("user", JSON.stringify(user));
            toast.info(action.payload.message);
          }
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.user = null;
        state.message = action.payload.response.data.message;
        // toast.error("Wrong credentials");
      });
    //getorders
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.orders = action.payload;
      state.message = "success";
    });

    builder
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrderByUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderbyuser = action.payload;
        state.message = "success";
      })
      .addCase(getOrderByUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;

        if (state.isSuccess) {
          toast.success("Profile updated Successfully!");
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;

        if (state.isSuccess === false) {
          toast.error("Something Went Wrong!");
        }
      });
  },
});

export default authSlice.reducer;
