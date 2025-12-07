import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    loading: false,
    error: null,
    carousels: [],
    featuredCarousels: [],
    carouselById: null,
    rangeCarousels: [],
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
    },
    getAllSuccess(state, action) {
      state.loading = false;
      state.carousels = action.payload;
    },
    getByIdSuccess(state, action) {
      state.loading = false;
      state.carouselById = action.payload;
    },
    getFeaturedSuccess(state, action) {
      state.loading = false;
      state.featuredCarousels = action.payload;
    },
    getRangeSuccess(state, action) {
      state.loading = false;
      state.rangeCarousels = action.payload;
    },
    failed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default carouselSlice.reducer;

export const getAllCarousels = () => async (dispatch) => {
  dispatch(carouselSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/carousel`)
    .then((res) => {
      dispatch(carouselSlice.actions.getAllSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        carouselSlice.actions.failed(err.response?.data?.message || err.message)
      );
    });
};

export const getCarouselById = (id) => async (dispatch) => {
  dispatch(carouselSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/carousel/${id}`)
    .then((res) => {
      dispatch(carouselSlice.actions.getByIdSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        carouselSlice.actions.failed(err.response?.data?.message || err.message)
      );
    });
};

export const getFeaturedCarousels = () => async (dispatch) => {
  dispatch(carouselSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/carousel/featured`)
    .then((res) => {
      dispatch(carouselSlice.actions.getFeaturedSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        carouselSlice.actions.failed(err.response?.data?.message || err.message)
      );
    });
};

export const getCarouselsByRange = (start, end) => async (dispatch) => {
  dispatch(carouselSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/carousel/all/between`, {
      params: { start, end },
    })
    .then((res) => {
      dispatch(carouselSlice.actions.getRangeSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        carouselSlice.actions.failed(err.response?.data?.message || err.message)
      );
    });
};
