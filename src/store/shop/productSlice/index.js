import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/shop/products";

const initialState = {
  productList: [],
  ProductDetails: null,
  isLoading: false,
  error: null,
};

export const getAllFilteredProducts = createAsyncThunk(
  "/products/getFilteredProducts",
  async ({ filteredParams, sortParams }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(filteredParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          query.append(key, value.join(","));
        } else if (value) {
          query.append(key, value);
        }
      });
      query.append("sortBy", sortParams);

      const result = await axios.get(`${API_URL}/getFilteredProducts?${query}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "/products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${API_URL}/getProductById/${id}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const ShoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.productList = [];
      })
      .addCase(getAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action?.payload?.data;
      })
      .addCase(getAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.payload;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
        state.ProductDetails = null; 
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ProductDetails = action?.payload?.data;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.ProductDetails = null;
        state.error = action.payload;
      });
  },
});

export default ShoppingProductSlice.reducer;
