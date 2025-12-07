import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const adminDayDataSlice = createSlice({
  name: "adminDayData",
  initialState: {
    loading: false,
    error: null,
    today: null,
    all: [],
    byDate: null,
    range: [],
    resetMessage: null,
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
    todaySuccess(state, action) {
      state.loading = false;
      state.today = action.payload;
    },
    byDateSuccess(state, action) {
      state.loading = false;
      state.byDate = action.payload;
    },
    rangeSuccess(state, action) {
      state.loading = false;
      state.range = action.payload;
    },
    resetSuccess(state, action) {
      state.loading = false;
      state.resetMessage = action.payload;
    },
    failed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default adminDayDataSlice.reducer;

export const getAllDayData = () => async (dispatch) => {
  dispatch(adminDayDataSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/admin/day-data/all`, { withCredentials: true })
    .then((res) => {
      dispatch(adminDayDataSlice.actions.allSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        adminDayDataSlice.actions.failed(
          err.response?.data?.message || err.message
        )
      );
    });
};

export const getTodayData = () => async (dispatch) => {
  dispatch(adminDayDataSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/admin/day-data/today`, { withCredentials: true })
    .then((res) => {
      dispatch(adminDayDataSlice.actions.todaySuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        adminDayDataSlice.actions.failed(
          err.response?.data?.message || err.message
        )
      );
    });
};

export const getDayDataByDate = (date) => async (dispatch) => {
  dispatch(adminDayDataSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/admin/day-data/${date}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminDayDataSlice.actions.byDateSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        adminDayDataSlice.actions.failed(
          err.response?.data?.message || err.message
        )
      );
    });
};

export const getRangeData = (startDate, endDate) => async (dispatch) => {
  dispatch(adminDayDataSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/admin/day-data/range`, {
      params: { startDate, endDate },
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminDayDataSlice.actions.rangeSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        adminDayDataSlice.actions.failed(
          err.response?.data?.message || err.message
        )
      );
    });
};

export const resetTodayDayData = () => async (dispatch) => {
  dispatch(adminDayDataSlice.actions.request());

  await axios
    .post(`${BACKEND_URL}/api/admin/day-data/reset-today`, null, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminDayDataSlice.actions.resetSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        adminDayDataSlice.actions.failed(
          err.response?.data?.message || err.message
        )
      );
    });
};
