import { useState, useEffect } from "react";
import { useAddItem } from "../hooks/useItemForm";

const AddItemForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    rating: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);


  const { addItem, loading } = useAddItem();

  const resetFields = () => {
    setForm({
      title: "",
      description: "",
      category: "",
      rating: "",
      price: "",
      image: null,
    });
    setPreview(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      const objectUrl = URL.createObjectURL(files[0]);
      setPreview(objectUrl);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(form, () => {
      if (onSuccess) onSuccess();
      resetFields();
    });
  };

  // Clean up preview URL when image changes or component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-[#e3e6e6] font-['Amazon Ember','Arial','sans-serif']">
      <h2 className="text-2xl font-bold mb-6 text-[#111] tracking-tight">Add Item</h2>
      <div className="mb-4">
        <label className="block mb-1 text-[#111] font-semibold">Title</label>
        <input name="title" value={form.title} onChange={handleChange} className="w-full border border-[#a6a6a6] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#f0c14b]" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-[#111] font-semibold">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border border-[#a6a6a6] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#f0c14b]" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-[#111] font-semibold">Category</label>
        <input name="category" value={form.category} onChange={handleChange} className="w-full border border-[#a6a6a6] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#f0c14b]" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-[#111] font-semibold">Rating</label>
        <input name="rating" value={form.rating} onChange={handleChange} className="w-full border border-[#a6a6a6] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#f0c14b]" required type="number" min="0" max="5" step="0.1" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-[#111] font-semibold">Price</label>
        <input name="price" value={form.price} onChange={handleChange} className="w-full border border-[#a6a6a6] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#f0c14b]" required type="number" min="0" step="0.01" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-[#111] font-semibold">Image</label>
        <input name="image" type="file" accept="image/*" onChange={handleChange} className="w-full border border-[#a6a6a6] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#f0c14b]" />
        {preview && <img src={preview} alt="Preview" className="mt-2 h-32 object-contain border border-[#e3e6e6] rounded" />}
      </div>
      <button type="submit" className="w-full py-2 rounded bg-[#FFD814] hover:bg-[#f7ca00] border border-[#f0c14b] text-[#111] font-semibold shadow-sm transition-colors duration-150 mt-2 disabled:opacity-60" disabled={loading}>
        {loading ? "Adding..." : "Add Item"}
      </button>
    </form>
  );
};

export default AddItemForm;
