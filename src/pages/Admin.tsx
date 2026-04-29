import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Edit, Save, X, Package, ShieldAlert } from "lucide-react";
import { Product } from "../types";

const Admin: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "Detox",
    description: "",
    image: "https://images.unsplash.com/photo-1544145945-f904253db0ad?q=80&w=800&auto=format&fit=crop",
  });

  if (!user?.isAdmin) return null;

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price) return;
    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name!,
      price: Number(newProduct.price),
      category: newProduct.category || "Detox",
      description: newProduct.description || "Freshly sourced herbal mix.",
      image: newProduct.image!,
    };
    addProduct(product);
    setNewProduct({ name: "", price: 0, category: "Detox", image: newProduct.image });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold text-emerald-950">Inventory Control</h1>
          <p className="text-emerald-700/60">Manage your premium herbal catalog.</p>
        </div>
        <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
          <Package className="w-5 h-5" />
          <span className="font-bold">{products.length} Products</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Add Product Form */}
        <div className="lg:col-span-1 border border-emerald-100 bg-white rounded-[40px] p-8 shadow-xl shadow-emerald-900/5 h-fit space-y-6">
          <h2 className="text-xl font-bold text-emerald-900 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Product</span>
          </h2>
          <div className="space-y-4">
            <input
              placeholder="Product Name"
              className="w-full px-4 py-3 rounded-xl border border-emerald-50 focus:ring-2 focus:ring-emerald-500 outline-none"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price (₹)"
              className="w-full px-4 py-3 rounded-xl border border-emerald-50 focus:ring-2 focus:ring-emerald-500 outline-none"
              value={newProduct.price || ""}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            />
            <select
              className="w-full px-4 py-3 rounded-xl border border-emerald-50 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            >
              <option>Detox</option>
              <option>Energy</option>
              <option>Wellness</option>
              <option>Hydration</option>
            </select>
            <textarea
              placeholder="Description"
              className="w-full px-4 py-3 rounded-xl border border-emerald-50 focus:ring-2 focus:ring-emerald-500 outline-none h-24"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <button
              onClick={handleAdd}
              className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add to Catalog</span>
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="hidden md:grid grid-cols-4 gap-4 px-8 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
            <div className="col-span-2">Product Details</div>
            <div>Category</div>
            <div className="text-right">Actions</div>
          </div>
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-[32px] p-6 border border-emerald-50 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
            >
              <div className="col-span-2 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-emerald-50">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-950">{product.name}</h3>
                  <p className="text-emerald-900 font-bold">₹{product.price}</p>
                </div>
              </div>
              <div className="text-sm font-medium text-emerald-700 bg-emerald-50 w-fit px-3 py-1 rounded-full">
                {product.category}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-3 text-emerald-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  className="p-3 text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                  title="Edit"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
