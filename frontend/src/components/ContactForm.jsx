import React, { useState, useEffect } from "react";

const ContactForm = ({ onSubmit, user }) => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setMobile(user?.mobile || "");
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemoveImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("description", description);

    files.forEach((file) => formData.append("files", file));

    onSubmit(formData);

    setTitle("");
    if (user) {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setMobile(user?.mobile || "");
    } else {
      setName("");
      setEmail("");
      setMobile("");
    }
    setDescription("");
    setFiles([]);
  };

  return (
    <form
      className="border my-5 max-w-lg mx-auto p-6 bg-white rounded-xl space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter subject"
          required
        />
      </div>

      {/* Name */}
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          disabled={!!user}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full border rounded-lg px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          required
          disabled={!!user}
        />
      </div>

      {/* Mobile */}
      <div>
        <label className="block mb-1 font-medium">Mobile</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="10-digit mobile number"
          required
          disabled={!!user}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Explain your issue or message"
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-1 font-medium">Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block"
        />
      </div>

      {/* Preview Images */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-3">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-24 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-2 mt-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
