import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  resetProductsSlice,
} from "../store/slices/productsSlice";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();

  const { products, loading, error, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetProductsSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetProductsSlice());
    }
  }, [dispatch, message, error]);

  return (
    <div className="min-h-screen pt-16 px-5 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Menu Page</h2>
        <h3 className="text-lg text-gray-500 mt-1">All Products</h3>
      </div>

      {loading ? (
        <p className="text-red-500 text-center font-semibold text-lg">
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products?.map((product, ind) => (
            <Link to={`/product-details/${product.id}`} key={ind}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
