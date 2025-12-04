import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { searchProducts } from "../store/slices/productsSlice";

export const Categories = [
  "Kunafa Chocolate",
  "Dates Chocolate",
  "Cigar Chocolate",
  "Celebration Box",
  "Irani Methi",
  "Kesar",
];

const SearchProducts = () => {
  const dispatch = useDispatch();

  const [params] = useSearchParams();
  const searchTerm = params.get("q") || "";

  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      dispatch(searchProducts(searchTerm));
    }
  }, [searchTerm, dispatch]);

  return (
    <div className="min-h-screen px-4 p-6 pt-16">
      {/* Search Heading */}
      {!loading && products?.length !== 0 && searchTerm.trim() !== "" && (
        <h1 className="text-xl font-semibold mb-4">
          Search Results for:{" "}
          <span className="text-blue-600">{searchTerm}</span>
        </h1>
      )}

      {/* Loading State */}
      {loading && (
        <p className="text-gray-600 text-lg">Searching products...</p>
      )}

      {/* No Results */}
      {!loading && products?.length === 0 && searchTerm.trim() !== "" && (
        <p className="text-gray-500 text-lg">No products found.</p>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-5">
        {searchTerm.trim() !== "" &&
          products?.map((item) => (
            <Link key={item?.id} to={`/product-details/${item?.id}`}>
              <div className="border p-3 rounded-md shadow-sm hover:shadow-lg transition">
                <img
                  src={item?.imageUrls?.[0]}
                  alt={item?.productName}
                  className="w-full h-32 object-cover rounded-md"
                />

                <h2 className="font-medium mt-2">{item?.productName}</h2>

                <p className="text-blue-600 font-semibold">
                  ₹{item?.productPrice}
                </p>
              </div>
            </Link>
          ))}
      </div>

      {/* Popular Categories */}
      <div>
        <h2 className="mt-2 font-semibold text-xl">Popular Categories</h2>
        <div className="flex mt-3 gap-5 overflow-x-scroll">
          {Categories.map((cat, ind) => {
            return (
              <Link key={ind} to={`/menu?subCategory=${cat}`}>
                <div className="flex flex-col items-center w-20 shrink-0">
                  <img src="/images/logo.jpg" className="rounded-full h-20" />
                  <p className="text-center">{cat}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
