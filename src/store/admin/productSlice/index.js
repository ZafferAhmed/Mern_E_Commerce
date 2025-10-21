import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/admin/products";

const initialState = {
  productList: [],
  productDetails: null,
  isLoading: false,
  error: null,
};

export const addNewProduct = createAsyncThunk(
  "/products/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${API_URL}/addProduct`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "/products/getAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${API_URL}/getAllProduct`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${API_URL}/getProductById/${id}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const result = await axios.patch(
        `${API_URL}/updateProduct/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${API_URL}/deleteProduct/${id}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.payload;
      })

      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload?.data;
      })

      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = [];
        state.error = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload?.data;
        if (!updatedProduct) return;

        if (state.productList?.data && Array.isArray(state.productList.data)) {
          state.productList.data = state.productList.data.map((p) =>
            p._id === updatedProduct._id ? updatedProduct : p
          );
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedId = action.payload?.data?._id;
        if (!deletedId) return;

        if (state.productList?.data && Array.isArray(state.productList.data)) {
          state.productList.data = state.productList.data.filter(
            (product) => product._id !== deletedId
          );
        }
      });
  },
});

export default AdminProductSlice.reducer;
