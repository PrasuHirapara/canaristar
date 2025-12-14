import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCarousel,
  deleteCarousel,
  getAllCarousels,
  getCarouselsBetween,
  getFeaturedCarousels,
  searchCarousel,
} from "../store/slices/adminCarouselSlice";

const AdminCarousel = () => {
  const dispatch = useDispatch();
  const { loading, error, message, carousels } = useSelector(
    (state) => state.adminCarousel
  );

  const [start, setStart] = useState("2024-01-01T00:00:00");
  const [end, setEnd] = useState("2025-12-31T23:59:59");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState(null);

  const [search, setSearch] = useState("");

  const [getFeaturedOnly, setGetFeaturedOnly] = useState(false);

  useEffect(() => {
    if (getFeaturedOnly) {
      dispatch(getFeaturedCarousels());
    } else {
      dispatch(getAllCarousels());
    }
    // dispatch(getCarouselsBetween(start, end))
    console.log(carousels);
  }, [getFeaturedOnly, dispatch, message]);

  const handleCreateCarousel = (e) => {
    e.preventDefault();

    if (!title || !file) {
      alert("Title and Image are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("redirectUrl", redirectUrl);
    formData.append("featured", featured);
    formData.append("file", file);

    dispatch(createCarousel(formData));
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setRedirectUrl("");
    setFeatured(false);
    setFile(null);
  };

  const handleSearchCarousel = (e) => {
    const value = e.target.value;
    setSearch(value);

    dispatch(searchCarousel(value));
  };

  const handledeleteCarousel = (id, name) => {
    const conf = confirm(`Are you sure want to delete product: ${name} ?`);
    if (!conf) return;
    dispatch(deleteCarousel(id));
  };

  return (
    <div className="border p-3 rounded w-full">
      <h2 className="text-2xl font-bold">AdminCarousel</h2>
      {loading && (
        <p className="text-blue-500 font-bold text-lg">Loading....</p>
      )}
      {error && (
        <p className="text-red-500 font-bold text-lg">Error: {error}</p>
      )}
      {message && (
        <p className="text-green-500 font-bold text-lg">Message: {message}</p>
      )}

      {/* create carousel */}
      <div className="max-w-lg bg-white p-3 my-3 rounded-lg border">
        <h3 className="text-xl font-semibold mb-4">Create Carousel</h3>

        <form onSubmit={handleCreateCarousel} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows="3"
              placeholder="Enter description"
            />
          </div>

          {/* redirectUrl */}
          <div>
            <label className="block mb-1 font-medium">Redirect Url</label>
            <input
              type="text"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="https://example.com"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <label className="font-medium">Featured</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-900 text-white py-2 rounded hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Carousel"}
          </button>
        </form>
      </div>

      <div className="bg-amber-800/5 p-2 rounded">
        <h2 className="text-xl font-bold my-2 text-center">All Carousels</h2>

        <div className="flex items-center gap-4 justify-end ">
          <label className="flex items-center gap-2 bg-amber-600 text-white py-1 px-3 rounded-xl">
            <input
              type="checkbox"
              checked={getFeaturedOnly}
              onChange={(e) => setGetFeaturedOnly(e.target.checked)}
              className=""
            />
            Featured only
          </label>
        </div>

        <input
          type="text"
          value={search}
          onChange={handleSearchCarousel}
          placeholder="Search carousel..."
          className="border px-3 py-2 my-3 rounded w-full"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {carousels?.length > 0 ? (
            carousels?.map((p, i) => (
              <div
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

                  {p?.featured && (
                    <span className="bg-blue-500 text-white py-0.5 px-3 rounded-xl">
                      Featured
                    </span>
                  )}

                  <p className="text-lg font-bold text-amber-600 mt-1">
                    {p.description}
                  </p>
                  <button
                    disabled={loading}
                    onClick={() => handledeleteCarousel(p.id, p.title)}
                    className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-400 disabled:opacity-60"
                  >
                    {loading ? "deleting..." : "DELETE"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No Carousels Found for: {search}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCarousel;
