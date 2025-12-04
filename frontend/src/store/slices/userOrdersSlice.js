import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: {
    loading: false,
    error: null,
    message: null,
    userOrders: null,
    selectedOrder: null,
  },
  reducers: {
    userOrdersRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    getUserOrdersSuccess(state, action) {
      state.loading = false;
      state.userOrders = action.payload;
    },

    getUserOrderByIdSuccess(state, action) {
      state.loading = false;
      state.selectedOrder = action.payload;
    },

    addUserOrderSuccess(state, action) {
      state.loading = false;
      state.message = "Order added successfully";
      state.userOrders = action.payload;
    },

    userOrdersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetUserOrdersSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.selectedOrder = null;
    },
  },
});

export const resetUserOrdersSlice = () => (dispatch) => {
  dispatch(userOrdersSlice.actions.resetUserOrdersSlice());
};

export const getUserOrders = (userId) => async (dispatch) => {
  dispatch(userOrdersSlice.actions.userOrdersRequest());

  await axios
    .get(`${BACKEND_URL}/api/user-orders/${userId}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(userOrdersSlice.actions.getUserOrdersSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        userOrdersSlice.actions.userOrdersFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getUserOrderById = (userId, orderId) => async (dispatch) => {
  dispatch(userOrdersSlice.actions.userOrdersRequest());

  await axios
    .get(`${BACKEND_URL}/api/user-orders/${userId}/${orderId}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(userOrdersSlice.actions.getUserOrderByIdSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        userOrdersSlice.actions.userOrdersFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const addOrderToUser = (userId, orderData) => async (dispatch) => {
  dispatch(userOrdersSlice.actions.userOrdersRequest());

  await axios
    .post(`${BACKEND_URL}/api/user-orders/${userId}`, orderData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((res) => {
      dispatch(userOrdersSlice.actions.addUserOrderSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        userOrdersSlice.actions.userOrdersFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export default userOrdersSlice.reducer;
