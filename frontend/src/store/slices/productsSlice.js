import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token") || null;

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    error: null,
    message: null,
    products: [],
    product: null,
  },

  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    success(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    failed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },

    getproductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },

    resetProductsSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const resetProductsSlice = () => (dispatch) => {
  dispatch(productSlice.actions.resetProductsSlice());
};

export const getAllProducts = () => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/products/all`)
    .then((res) => {
      dispatch(productSlice.actions.getProductsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const getProductById = (id) => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/products/${id}`)
    .then((res) => {
      dispatch(productSlice.actions.getproductSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const getProductByName = (name) => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/products/name/${name}`)
    .then((res) => {
      dispatch(productSlice.actions.getProductsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const getActiveProducts = () => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/products/active`)
    .then((res) => {
      dispatch(productSlice.actions.getProductsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const getFeaturedProducts = () => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/products/featured`)
    .then((res) => {
      dispatch(productSlice.actions.getProductsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const getActiveFeaturedProducts = () => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/products/active-featured`)
    .then((res) => {
      dispatch(productSlice.actions.getProductsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const getProductsByCategory = (category) => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/products/category/${category}`)
    .then((res) => {
      dispatch(productSlice.actions.getProductsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const getProductsBySubCategory = (subCat) => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/products/sub-category/${subCat}`)
    .then((res) => {
      dispatch(productSlice.actions.getProductsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const getActiveByCategory = (category) => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .get(`${BACKEND_URL}/api/products/category/${category}/active`)
    .then((res) => {
      dispatch(productSlice.actions.getProductsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const createProduct = (productData) => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .post(`${BACKEND_URL}/api/products`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(productSlice.actions.success("Product Created"));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const updateProduct = (productData) => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .put(`${BACKEND_URL}/api/products`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(productSlice.actions.success("Product Updated"));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .delete(`${BACKEND_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      dispatch(productSlice.actions.success("Product Deleted"));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const uploadProductImage = (id, file) => async (dispatch) => {
  dispatch(productSlice.actions.request());

  const formData = new FormData();
  formData.append("file", file);

  await axios
    .post(`${BACKEND_URL}/api/products/${id}/upload-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch(productSlice.actions.success("Image Uploaded"));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export const deleteProductImage = (id, imageUrl) => async (dispatch) => {
  dispatch(productSlice.actions.request());

  await axios
    .delete(`${BACKEND_URL}/api/products/${id}/delete-image`, {
      headers: { Authorization: `Bearer ${token}` },
      data: JSON.stringify(imageUrl),
    })
    .then(() => {
      dispatch(productSlice.actions.success("Image Deleted"));
    })
    .catch((err) => {
      dispatch(productSlice.actions.failed(err.response?.data || err.message));
    });
};

export default productSlice.reducer;
