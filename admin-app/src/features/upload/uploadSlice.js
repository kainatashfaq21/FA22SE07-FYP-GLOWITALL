import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      console.log("daata", data);
      for (let i = 0; i < data.length; i++) {
        formData.append("file", data[i]);
      }

      let response = await uploadService.uploadImg(formData);
      response = response.map((res) => ({
        url: res.url,
        public_id: res.public_id,
      }));
      console.log(response);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

export const deleteImg = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload; // corrected property name
      })
      .addCase(uploadImg.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })

      .addCase(deleteImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [];
      })
      .addCase(deleteImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error; // use only the error message
      });
  },
});
export default uploadSlice.reducer;
