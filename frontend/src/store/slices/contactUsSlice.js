import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const contactUsSlice = createSlice({
  name: "contactUs",
  initialState: {
    loading: false,
    error: null,
    message: null,
    list: [],
    contact: null,
  },

  reducers: {
    createContactUsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createContactUsSuccess(state, action) {
      state.loading = false;
      state.contact = action.payload;
      state.message = "Submitted successfully";
    },
    createContactUsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getContactUsByEmailRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getContactUsByEmailSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    getContactUsByEmailFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getContactUsByIdRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getContactUsByIdSuccess(state, action) {
      state.loading = false;
      state.contact = action.payload;
    },
    getContactUsByIdFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateContactUsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateContactUsSuccess(state, action) {
      state.loading = false;
      state.contact = action.payload;
      state.message = "Updated successfully";
    },
    updateContactUsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetContactUsSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const resetContactUsSlice = () => (dispatch) => {
  dispatch(contactUsSlice.actions.resetContactUsSlice());
};

export const createContactUs = (formData) => async (dispatch) => {
  dispatch(contactUsSlice.actions.createContactUsRequest());

  await axios
    .post(`${BACKEND_URL}/contact-us`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      dispatch(contactUsSlice.actions.createContactUsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        contactUsSlice.actions.createContactUsFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getContactUsByEmail = (email) => async (dispatch) => {
  dispatch(contactUsSlice.actions.getContactUsByEmailRequest());

  await axios
    .get(`${BACKEND_URL}/contact-us/all`, {
      params: { email },
    })
    .then((res) => {
      dispatch(contactUsSlice.actions.getContactUsByEmailSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        contactUsSlice.actions.getContactUsByEmailFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getContactUsById = (id) => async (dispatch) => {
  dispatch(contactUsSlice.actions.getContactUsByIdRequest());

  await axios
    .get(`${BACKEND_URL}/contact-us/${id}`)
    .then((res) => {
      dispatch(contactUsSlice.actions.getContactUsByIdSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        contactUsSlice.actions.getContactUsByIdFailed(
          error.response?.data?.message || error.message
        )
      );
      console.log(error);
    });
};

export const updateContactUs = (id, data) => async (dispatch) => {
  dispatch(contactUsSlice.actions.updateContactUsRequest());

  await axios
    .put(`${BACKEND_URL}/contact-us/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(contactUsSlice.actions.updateContactUsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        contactUsSlice.actions.updateContactUsFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export default contactUsSlice.reducer;
