import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteSlider from "../components/InfiniteSlider";
import Slider from "../components/Slider";
import {
  getAllCarousels,
  getCarouselById,
  getFeaturedCarousels,
} from "../store/slices/carouselSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const [start, setStart] = useState("2025-01-01T00:00:00");
  const [end, setEnd] = useState("2025-01-31T23:59:59");

  const {
    loading,
    error,
    carousels,
    featuredCarousels,
    carouselById,
    rangeCarousels,
  } = useSelector((state) => state.carousel);

  useEffect(() => {
    dispatch(getAllCarousels());
    // console.log("Carousels: ", carousels);
    dispatch(getFeaturedCarousels());
    // console.log("Featured Carousels: ", featuredCarousels);
    // dispatch(getCarouselById(id));
    // console.log(carouselById);
    // dispatch(getCarouselsByRange(start, end));
  }, []);

  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen text-gray-200 text-xl bg-amber-50">
      <Slider />

      <InfiniteSlider />

      <section className="py-12 px-4">
        <h2 className="text-amber-900 font-bold text-center text-3xl mb-8">
          Our Special Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredCarousels.map((p, i) => (
            <Link
              to={p.redirectUrl}
              key={i}
              className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              {/* Image */}
              <div className="w-full overflow-hidden">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {p.title}
                </p>

                <p className="text-lg font-bold text-amber-600 mt-1">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 bg-amber-100">
        <h2 className="text-amber-900 font-bold text-center text-3xl mb-8">
          About Us
        </h2>
        <div className="max-w-5xl mx-auto md:flex md:items-center md:gap-10">
          <img
            src="/images/slider/image1.png"
            alt="Chocolate making"
            className="w-full md:w-1/2 h-80 object-cover rounded-lg mb-6 md:mb-0"
          />
          <p className="text-gray-800 text-lg text-justify md:w-1/2">
            We craft the finest chocolates with passion and care. From bean to
            bar, every chocolate is handmade using premium ingredients, ensuring
            an unforgettable taste experience for you and your loved ones. We
            craft the finest chocolates with passion and care. From bean to bar,
            every chocolate is handmade using premium ingredients, ensuring an
            unforgettable taste experience for you and your loved ones.
          </p>
        </div>
      </section>
    </div>
  );
}
