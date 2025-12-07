import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCarousels } from "../store/slices/carouselSlice";

const InfiniteSlider = () => {
  const dispatch = useDispatch();

  const { loading, error, carousels } = useSelector((state) => state.carousel);

  useEffect(() => {
    dispatch(getAllCarousels());
    // console.log("Carousels: ", carousels);
  }, []);

  return (
    <div className="relative overflow-hidden m-0 md:m-3 py-2 -mb-8">
      {/* Inline animation with responsive speed */}
      <style>
        {`
          @keyframes scroll-slow {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-fast {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .scrolling-desktop {
            animation: scroll-slow 8s linear infinite;
          }

          .scrolling-mobile {
            animation: scroll-fast 5s linear infinite;
          }

          .group:hover .scrolling-desktop,
          .group:hover .scrolling-mobile {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="group">
        {/* Desktop */}
        <div className="hidden sm:flex gap-3 w-max scrolling-desktop">
          {carousels?.length > 0 &&
            [...carousels, ...carousels].map((c, i) => (
              <Link
                to={c.redirectUrl}
                key={i}
                draggable="false"
                className="w-45 md:w-50 rounded-lg shadow-lg flex-shrink-0"
              >
                <img
                  draggable="false"
                  loading="lazy"
                  src={c.imageUrl}
                  className="w-full opcaity-90 hover:opacity-100 hover:scale-105 hover:brightness-110 hover:contrast-125 transition-transform duration-200 rounded-lg"
                />
                <p className="px-2 pb-0.5 text-center text-md absolute text-gray-300 bg-linear-to-b to-black/80 w-45 md:w-50 bottom-0 rounded-b-lg">
                  {c?.title}
                </p>
              </Link>
            ))}
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden gap-2 mb-10 w-max scrolling-mobile">
          {carousels?.length > 0 &&
            [...carousels, ...carousels].map((c, i) => (
              <Link
                to={c.redirectUrl}
                key={i}
                draggable="false"
                className="w-45 md:w-50 rounded-lg shadow-lg flex-shrink-0"
              >
                <img
                  draggable="false"
                  loading="lazy"
                  src={c.imageUrl}
                  className="w-full rounded-lg"
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteSlider;
