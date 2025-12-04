import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    error: null,
    message: null,
    order: null,
    orders: [],
  },
  reducers: {
    orderRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    orderSuccess(state, action) {
      state.loading = false;
      state.order = action.payload;
    },
    orderFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    ordersListSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },

    resetOrdersSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.order = null;
    },
  },
});

export const resetOrdersSlice = () => (dispatch) => {
  dispatch(ordersSlice.actions.resetOrdersSlice());
};

export const createOrder = (orderData) => async (dispatch) => {
  dispatch(ordersSlice.actions.orderRequest());

  await axios
    .post(`${BACKEND_URL}/api/orders`, orderData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(ordersSlice.actions.orderSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        ordersSlice.actions.orderFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const verifyPayment = (orderId, paymentData) => async (dispatch) => {
  dispatch(ordersSlice.actions.orderRequest());

  await axios
    .post(`${BACKEND_URL}/api/orders/${orderId}/payment/verify`, paymentData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((res) => {
      dispatch(ordersSlice.actions.orderSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        ordersSlice.actions.orderFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch(ordersSlice.actions.orderRequest());

  await axios
    .get(`${BACKEND_URL}/api/orders/${orderId}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(ordersSlice.actions.orderSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        ordersSlice.actions.orderFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getUserOrders = (userId) => async (dispatch) => {
  dispatch(ordersSlice.actions.orderRequest());

  await axios
    .get(`${BACKEND_URL}/api/orders/user/${userId}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(ordersSlice.actions.ordersListSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        ordersSlice.actions.orderFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getAllOrders = () => async (dispatch) => {
  dispatch(ordersSlice.actions.orderRequest());

  await axios
    .get(`${BACKEND_URL}/api/orders`, { withCredentials: true })
    .then((res) => {
      dispatch(ordersSlice.actions.ordersListSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        ordersSlice.actions.orderFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getOrdersBetween = (start, end) => async (dispatch) => {
  dispatch(ordersSlice.actions.orderRequest());

  await axios
    .get(`${BACKEND_URL}/api/orders/between`, {
      params: { start, end },
      withCredentials: true,
    })
    .then((res) => {
      dispatch(ordersSlice.actions.ordersListSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        ordersSlice.actions.orderFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getOrdersByType = (type) => async (dispatch) => {
  dispatch(ordersSlice.actions.orderRequest());

  await axios
    .get(`${BACKEND_URL}/api/orders/type/${type}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(ordersSlice.actions.ordersListSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        ordersSlice.actions.orderFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export default ordersSlice.reducer;
