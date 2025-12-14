import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const adminCarouselSlice = createSlice({
  name: "adminCarousel",
  initialState: {
    loading: false,
    error: null,
    message: null,
    carousels: [],
  },

  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    requestSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },

    requestFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getCarouselsSuccess(state, action) {
      state.loading = false;
      state.carousels = action.payload;
    },

    resetCarouselState(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const resetCarouselState = () => (dispatch) => {
  dispatch(adminCarouselSlice.actions.resetCarouselState());
};

export const getAllCarousels = () => async (dispatch) => {
  dispatch(adminCarouselSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/api/admin/carousel`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminCarouselSlice.actions.getCarouselsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminCarouselSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getFeaturedCarousels = () => async (dispatch) => {
  dispatch(adminCarouselSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/api/admin/carousel/featured`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminCarouselSlice.actions.getCarouselsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminCarouselSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getCarouselsBetween = (start, end) => async (dispatch) => {
  dispatch(adminCarouselSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/api/admin/carousel/all/between`, {
      params: { start, end },
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminCarouselSlice.actions.getCarouselsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminCarouselSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const searchCarousel = (token) => async (dispatch) => {
  dispatch(adminCarouselSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/api/admin/carousel/search`, {
      params: { token },
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminCarouselSlice.actions.getCarouselsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminCarouselSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const createCarousel = (formData) => async (dispatch) => {
  dispatch(adminCarouselSlice.actions.requestStart());
  await axios
    .post(`${BACKEND_URL}/api/admin/carousel`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch(adminCarouselSlice.actions.requestSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminCarouselSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const deleteCarousel = (id) => async (dispatch) => {
  dispatch(adminCarouselSlice.actions.requestStart());
  await axios
    .delete(`${BACKEND_URL}/api/admin/carousel/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminCarouselSlice.actions.requestSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminCarouselSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export default adminCarouselSlice.reducer;
