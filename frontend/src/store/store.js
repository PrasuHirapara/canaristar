import { configureStore } from "@reduxjs/toolkit";
import adminProductReducer from "./slices/adminProductSlice";
import adminReducer from "./slices/adminSlice";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    adminProduct: adminProductReducer,
    admin: adminReducer,
    auth: authReducer,
    products: productsReducer,
    user: userReducer,
  },
});
