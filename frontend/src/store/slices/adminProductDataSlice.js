import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const adminProductDataSlice = createSlice({
  name: "adminProductData",
  initialState: {
    loading: false,
    error: null,
    all: [],
    single: null,
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
    },
    allSuccess(state, action) {
      state.loading = false;
      state.all = action.payload;
    },
    singleSuccess(state, action) {
      state.loading = false;
      state.single = action.payload;
    },
    failed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default adminProductDataSlice.reducer;

export const getAllProductAnalytics = () => async (dispatch) => {
  dispatch(adminProductDataSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/admin/product-data/all`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminProductDataSlice.actions.allSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        adminProductDataSlice.actions.failed(
          err.response?.data?.message || err.message
        )
      );
    });
};

export const getProductAnalyticsById = (productId) => async (dispatch) => {
  dispatch(adminProductDataSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/admin/product-data/product`, {
      params: { productId },
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminProductDataSlice.actions.singleSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        adminProductDataSlice.actions.failed(
          err.response?.data?.message || err.message
        )
      );
    });
};
