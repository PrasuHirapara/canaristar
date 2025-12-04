import { configureStore } from "@reduxjs/toolkit";
import adminProductReducer from "./slices/adminProductSlice";
import adminReducer from "./slices/adminSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/ordersSlice";
import productsReducer from "./slices/productsSlice";
import userOrdersReducer from "./slices/userOrdersSlice";
import userReducer from "./slices/userSlice";
import contactUsReducer from "./slices/contactUsSlice";
import adminContactUsReducer from "./slices/adminContactUsSlice";

export const store = configureStore({
  reducer: {
    adminProduct: adminProductReducer,
    admin: adminReducer,
    auth: authReducer,
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer,
    userOrders: userOrdersReducer,
    contactUs: contactUsReducer,
    adminContactUs: adminContactUsReducer,
  },
});
