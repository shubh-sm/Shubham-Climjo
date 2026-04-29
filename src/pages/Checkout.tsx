import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

const Checkout: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    address: "",
    city: "",
    phone: "",
  });

  React.useEffect(() => {
    if (user?.name && !formData.name) {
      setFormData(prev => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 3000);
  };

  if (cartItems.length === 0 && !isOrdered) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <h2 className="text-2xl font-serif font-bold text-emerald-950">Your cart is empty</h2>
        <button onClick={() => navigate("/")} className="text-emerald-700 font-bold underline underline-offset-8">
          Go Shop Something
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <AnimatePresence>
        {isOrdered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 space-y-6 text-center"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-emerald-950">Order Placed Successfully!</h1>
            <p className="text-emerald-700 max-w-sm">
              Thank you for choosing Climjo. Your herbal mix is being prepared with care and will reach you soon.
            </p>
            <p className="text-sm text-emerald-500 animate-pulse">Redirecting to home...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form Section */}
        <div className="space-y-12">
          <div className="space-y-4">
            <button onClick={() => navigate(-1)} className="flex items-center text-emerald-600 font-bold text-sm uppercase tracking-widest space-x-2 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Shopping</span>
            </button>
            <h1 className="text-4xl font-serif font-bold text-emerald-950 tracking-tight">Checkout</h1>
            <p className="text-emerald-700/60 leading-relaxed">Fill in your details to finalize your ritual.</p>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-8">
            <div className="space-y-6">
              <h3 className="font-bold text-emerald-900 border-b border-emerald-50 pb-2">Shipping Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <input
                  required
                  placeholder="Full Name"
                  className="w-full px-6 py-4 bg-white border border-emerald-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  required
                  placeholder="Address Line 1"
                  className="w-full px-6 py-4 bg-white border border-emerald-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="City"
                    className="w-full px-6 py-4 bg-white border border-emerald-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                  <input
                    required
                    placeholder="Phone"
                    className="w-full px-6 py-4 bg-white border border-emerald-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-emerald-900 border-b border-emerald-50 pb-2">Payment Mode</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 border-2 border-emerald-600 rounded-2xl flex items-center space-x-3 cursor-pointer">
                  <CreditCard className="text-emerald-600" />
                  <span className="font-bold text-emerald-900">COD</span>
                </div>
                <div className="p-4 border-2 border-emerald-100 rounded-2xl flex items-center space-x-3 opacity-50 cursor-not-allowed">
                  <Truck className="text-emerald-400" />
                  <span className="font-bold text-emerald-400">Card (Disabled)</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-900 hover:bg-black text-white py-6 rounded-3xl font-bold flex items-center justify-center space-x-3 transition-all transform active:scale-[0.98] shadow-2xl shadow-emerald-200"
            >
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xl">Place Order • ₹{totalPrice}</span>
            </button>
          </form>
        </div>

        {/* Summary Section */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-emerald-50/50 rounded-[40px] p-8 space-y-8 border border-emerald-100">
            <h3 className="text-2xl font-serif font-bold text-emerald-950">Order Summary</h3>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-emerald-200">
              {cartItems.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-emerald-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-emerald-950">{item.name}</h4>
                    <p className="text-xs text-emerald-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-950">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-emerald-100">
              <div className="flex justify-between text-emerald-700">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Shipping</span>
                <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px]">Free</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-emerald-950 pt-2 border-t border-emerald-100/50">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
