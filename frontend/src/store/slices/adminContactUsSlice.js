import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const adminContactUsSlice = createSlice({
  name: "adminContactUs",
  initialState: {
    loading: false,
    error: null,
    message: null,
    list: [],
    updated: null,
  },

  reducers: {
    getAllRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getAllSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    getAllFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getByStatusRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getByStatusSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    getByStatusFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getBetweenRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getBetweenSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    getBetweenFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    sendReplyRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    sendReplySuccess(state, action) {
      state.loading = false;
      state.updated = action.payload;
      state.message = "Reply sent successfully";
    },
    sendReplyFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetAdminContactUsSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.updated = null;
    },
  },
});

export const resetAdminContactUsSlice = () => (dispatch) => {
  dispatch(adminContactUsSlice.actions.resetAdminContactUsSlice());
};

export const getAllContactUs = () => async (dispatch) => {
  dispatch(adminContactUsSlice.actions.getAllRequest());

  await axios
    .get(`${BACKEND_URL}/api/admin/contact-us/all`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminContactUsSlice.actions.getAllSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminContactUsSlice.actions.getAllFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getContactUsByStatus = (status) => async (dispatch) => {
  dispatch(adminContactUsSlice.actions.getByStatusRequest());

  await axios
    .get(`${BACKEND_URL}/api/admin/contact-us/all/status`, {
      params: { status },
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminContactUsSlice.actions.getByStatusSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminContactUsSlice.actions.getByStatusFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getContactUsBetween = (start, end) => async (dispatch) => {
  dispatch(adminContactUsSlice.actions.getBetweenRequest());

  await axios
    .get(`${BACKEND_URL}/api/admin/contact-us/all/between`, {
      params: { start, end },
      withCredentials: true,
    })
    .then((res) => {
      dispatch(adminContactUsSlice.actions.getBetweenSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminContactUsSlice.actions.getBetweenFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const sendAdminReply = (id, data) => async (dispatch) => {
  dispatch(adminContactUsSlice.actions.sendReplyRequest());

  await axios
    .put(`${BACKEND_URL}/api/admin/contact-us/response/${id}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(adminContactUsSlice.actions.sendReplySuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminContactUsSlice.actions.sendReplyFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export default adminContactUsSlice.reducer;
