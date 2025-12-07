import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const adminAnalyticsSlice = createSlice({
  name: "adminAnalytics",
  initialState: {
    loading: false,
    error: null,
    totalRevenue: 0,
    revenueBetween: 0,
  },

  reducers: {
    getTotalRevenueRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getTotalRevenueSuccess(state, action) {
      state.loading = false;
      state.totalRevenue = action.payload;
    },
    getTotalRevenueFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getRevenueBetweenRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getRevenueBetweenSuccess(state, action) {
      state.loading = false;
      state.revenueBetween = action.payload;
    },
    getRevenueBetweenFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetAnalytics(state) {
      state.loading = false;
      state.error = null;
    },
  },
});

export const resetAnalytics = () => (dispatch) => {
  dispatch(adminAnalyticsSlice.actions.resetAnalytics());
};

export const getTotalRevenue = () => async (dispatch) => {
  dispatch(adminAnalyticsSlice.actions.getTotalRevenueRequest());

  await axios
    .get(`${BACKEND_URL}/api/admin/analytics/revenue/total`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(adminAnalyticsSlice.actions.getTotalRevenueSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminAnalyticsSlice.actions.getTotalRevenueFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getRevenueBetween = (startDate, endDate) => async (dispatch) => {
  dispatch(adminAnalyticsSlice.actions.getRevenueBetweenRequest());

  await axios
    .get(`${BACKEND_URL}/api/admin/analytics/revenue/between`, {
      params: { startDate, endDate },
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(adminAnalyticsSlice.actions.getRevenueBetweenSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminAnalyticsSlice.actions.getRevenueBetweenFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export default adminAnalyticsSlice.reducer;
