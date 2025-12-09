import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    loading: false,
    error: null,
    topViewed: [],
    topOrdered: [],
    topRated: [],
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
    },
    topViewedSuccess(state, action) {
      state.loading = false;
      state.topViewed = action.payload;
    },
    topOrderedSuccess(state, action) {
      state.loading = false;
      state.topOrdered = action.payload;
    },
    topRatedSuccess(state, action) {
      state.loading = false;
      state.topRated = action.payload;
    },
    failed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default analyticsSlice.reducer;

export const getTopViewedProducts = () => async (dispatch) => {
  dispatch(analyticsSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/analytics/top-viewed`, { withCredentials: true })
    .then((res) => {
      dispatch(analyticsSlice.actions.topViewedSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        analyticsSlice.actions.failed(
          err.response?.data?.message || err.message
        )
      );
    });
};

export const getTopOrderedProducts = () => async (dispatch) => {
  dispatch(analyticsSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/analytics/top-ordered`, { withCredentials: true })
    .then((res) => {
      dispatch(analyticsSlice.actions.topOrderedSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        analyticsSlice.actions.failed(
          err.response?.data?.message || err.message
        )
      );
    });
};

export const getTopRatedProducts = () => async (dispatch) => {
  dispatch(analyticsSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/analytics/top-rated`, { withCredentials: true })
    .then((res) => {
      dispatch(analyticsSlice.actions.topRatedSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        analyticsSlice.actions.failed(
          err.response?.data?.message || err.message
        )
      );
    });
};
