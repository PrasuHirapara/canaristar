import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createProduct,
  resetAdminProductSlice,
} from "../store/slices/adminProductSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.adminProduct
  );

  const [form, setForm] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
    productSubCategory: "",
    sellingPrice: "",
    mrpPrice: "",
    weight: "",
    active: false,
    featured: false,
    imageUrls: [],
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAdminProductSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAdminProductSlice());
    }
  }, [dispatch, message, error]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));

      // upload image to Cloudinary later For now we push temp preview URL
      setForm({ ...form, imageUrls: [preview] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.productCategory == "") {
      alert("Please select product Category ⚠");
      return;
    }

    if (form.productSubCategory == "") {
      alert("Please select product Sub-Category ⚠");
      return;
    }

    const finalData = {
      ...form,
      sellingPrice: Number(form.sellingPrice),
      mrpPrice: Number(form.mrpPrice),
      weight: Number(form.weight),
      imageUrls: form.imageUrls,
    };
    dispatch(createProduct(finalData));
    // console.log("Final Product Payload:", finalData);
    setPreview("");
    resetFormData();
  };

  const resetFormData = () => {
    setForm({
      productName: "",
      productDescription: "",
      productCategory: "",
      productSubCategory: "",
      sellingPrice: "",
      mrpPrice: "",
      weight: "",
      active: false,
      featured: false,
      imageUrls: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-amber-800 mb-6 text-center">
          Create New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Name */}
          <div>
            <label className="font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Selling Price */}
          <div>
            <label className="font-medium text-gray-700">
              Selling Price (₹)
            </label>
            <input
              type="number"
              name="sellingPrice"
              value={form.sellingPrice}
              onChange={handleChange}
              required
              placeholder="Enter selling price"
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
          </div>

          {/* MRP Price */}
          <div>
            <label className="font-medium text-gray-700">MRP Price (₹)</label>
            <input
              type="number"
              name="mrpPrice"
              value={form.mrpPrice}
              onChange={handleChange}
              required
              placeholder="Enter MRP"
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="font-medium text-gray-700">Weight (grams)</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              required
              placeholder="Enter weight (ex: 250)"
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium text-gray-700">Category</label>
            <select
              name="productCategory"
              value={form.productCategory}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            >
              <option value="">Select category</option>
              <option value="CHOCOLATE">CHOCOLATE</option>
              <option value="GIFT_BOX">GIFT_BOX</option>
              <option value="PREMIUM_HERBS">PREMIUM_HERBS</option>
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className="font-medium text-gray-700">Sub Category</label>
            <select
              name="productSubCategory"
              value={form.productSubCategory}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            >
              <option value="">Select sub-category</option>
              <option value="KUNAFA_CHOCOLATE">KUNAFA_CHOCOLATE</option>
              <option value="DATES_CHOCOLATE">DATES_CHOCOLATE</option>
              <option value="CIGAR_CHOCOLATE">CIGAR_CHOCOLATE</option>
              <option value="CELEBRATION_BOX">CELEBRATION_BOX</option>
              <option value="IRANI_METHI">IRANI_METHI</option>
              <option value="KESAR">KESAR</option>
            </select>
          </div>

          {/* Active */}
          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-700">Active:</label>
            <input
              type="checkbox"
              checked={form.active}
              onChange={() => setForm({ ...form, active: !form.active })}
              className="h-5 w-5"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-700">Featured:</label>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={() => setForm({ ...form, featured: !form.featured })}
              className="h-5 w-5"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-4 w-40 h-40 object-cover rounded-md shadow"
              />
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              name="productDescription"
              value={form.productDescription}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Write product description..."
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-amber-500"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-amber-800 text-white px-8 py-3 rounded-md font-semibold hover:bg-amber-700 transition"
            >
              {loading ? "Creating product..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
