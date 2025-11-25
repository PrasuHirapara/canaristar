import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token") || null;

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    loading: false,
    error: null,
    message: null,
    product: null,
    products: [],
  },
  reducers: {
    createProductRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    createProductFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateProductRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    updateProductFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProductRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.product = null;
    },
    deleteProductFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    uploadImageRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    uploadImageSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    uploadImageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteImageRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteImageSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    deleteImageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetAdminProductSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.product = null;
    },
  },
});

export const resetAdminProductSlice = () => (dispatch) => {
  dispatch(adminProductSlice.actions.resetAdminProductSlice());
};

export const createProduct = (productData) => async (dispatch) => {
  dispatch(adminProductSlice.actions.createProductRequest());
  await axios
    .post(`${BACKEND_URL}/api/products`, productData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(adminProductSlice.actions.createProductSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminProductSlice.actions.createProductFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const updateProduct = (productData) => async (dispatch) => {
  dispatch(adminProductSlice.actions.updateProductRequest());
  await axios
    .put(`${BACKEND_URL}/api/products`, productData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(adminProductSlice.actions.updateProductSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminProductSlice.actions.updateProductFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(adminProductSlice.actions.deleteProductRequest());
  await axios
    .delete(`${BACKEND_URL}/api/products/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(adminProductSlice.actions.deleteProductSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminProductSlice.actions.deleteProductFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const uploadProductImage = (id, formData) => async (dispatch) => {
  dispatch(adminProductSlice.actions.uploadImageRequest());
  await axios
    .post(`${BACKEND_URL}/api/products/${id}/upload-image`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(adminProductSlice.actions.uploadImageSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminProductSlice.actions.uploadImageFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const deleteProductImage = (id, imageUrl) => async (dispatch) => {
  dispatch(adminProductSlice.actions.deleteImageRequest());
  await axios
    .delete(`${BACKEND_URL}/api/products/${id}/delete-image`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { imageUrl },
    })
    .then((res) => {
      dispatch(adminProductSlice.actions.deleteImageSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        adminProductSlice.actions.deleteImageFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export default adminProductSlice.reducer;
