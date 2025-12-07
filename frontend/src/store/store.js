import { configureStore } from "@reduxjs/toolkit";
import adminAnalyticsReducer from "./slices/adminAnalyticsSlice";
import adminCarouselReducer from "./slices/adminCarouselSlice";
import adminContactUsReducer from "./slices/adminContactUsSlice";
import adminDayDataReducer from "./slices/adminDayDataSlice";
import adminProductDataReducer from "./slices/adminProductDataSlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminReducer from "./slices/adminSlice";
import analyticsReducer from "./slices/analyticsSlice";
import authReducer from "./slices/authSlice";
import carouselReducer from "./slices/carouselSlice";
import cartReducer from "./slices/cartSlice";
import contactUsReducer from "./slices/contactUsSlice";
import orderReducer from "./slices/ordersSlice";
import productsReducer from "./slices/productsSlice";
import userOrdersReducer from "./slices/userOrdersSlice";
import userReducer from "./slices/userSlice";

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
    analytics: analyticsReducer,
    adminAnalytics: adminAnalyticsReducer,
    carousel: carouselReducer,
    adminCarousel: adminCarouselReducer,
    adminDayData: adminDayDataReducer,
    adminProductData: adminProductDataReducer,
  },
});
