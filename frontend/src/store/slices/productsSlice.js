import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    error: null,
    message: null,
    products: [],
    product: null,
  },
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    requestFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    allProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },

    productByIdSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },

    productByNameSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },

    activeProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },

    featuredProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },

    activeFeaturedProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },

    productsByCategorySuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },

    productsBySubCategorySuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },

    activeProductsByCategorySuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },

    resetProductsSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.products = [];
      state.product = null;
    },
  },
});

export const resetProductsSlice = () => (dispatch) => {
  dispatch(productsSlice.actions.resetProductsSlice());
};

export const getAllProducts = () => async (dispatch) => {
  dispatch(productsSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/products/all`, { withCredentials: true })
    .then((res) => {
      dispatch(productsSlice.actions.allProductsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productsSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getProductById = (productId) => async (dispatch) => {
  dispatch(productsSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/products/${productId}`, { withCredentials: true })
    .then((res) => {
      dispatch(productsSlice.actions.productByIdSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productsSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getProductByName = (productName) => async (dispatch) => {
  dispatch(productsSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/products/name/${productName}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(productsSlice.actions.productByNameSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productsSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getActiveProducts = () => async (dispatch) => {
  dispatch(productsSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/products/active`, { withCredentials: true })
    .then((res) => {
      dispatch(productsSlice.actions.activeProductsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productsSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getFeaturedProducts = () => async (dispatch) => {
  dispatch(productsSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/products/featured`, { withCredentials: true })
    .then((res) => {
      dispatch(productsSlice.actions.featuredProductsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productsSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getActiveFeaturedProducts = () => async (dispatch) => {
  dispatch(productsSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/products/active-featured`, { withCredentials: true })
    .then((res) => {
      dispatch(productsSlice.actions.activeFeaturedProductsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productsSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getProductsByCategory = (category) => async (dispatch) => {
  dispatch(productsSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/products/category/${category}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(productsSlice.actions.productsByCategorySuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productsSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getProductsBySubCategory = (subCategory) => async (dispatch) => {
  dispatch(productsSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/products/sub-category/${subCategory}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(productsSlice.actions.productsBySubCategorySuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productsSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export const getActiveProductsByCategory = (category) => async (dispatch) => {
  dispatch(productsSlice.actions.requestStart());
  await axios
    .get(`${BACKEND_URL}/products/category/${category}/active`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(productsSlice.actions.activeProductsByCategorySuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productsSlice.actions.requestFailed(
          error.response?.data?.message || error.message
        )
      );
    });
};

export default productsSlice.reducer;
