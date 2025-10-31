import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "../store/admin/productSlice/index";
import ShoppingProductSlice from "../store/shop/productSlice/index";
import ShoppingCartSlice from "../store/shop/cartSlice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductSlice,
    shopProducts: ShoppingProductSlice,
    shoppingCart: ShoppingCartSlice,
  },
});

export default store;
