import React from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] transition-transform duration-500 ease-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-emerald-50 flex justify-between items-center bg-emerald-50/50">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-emerald-800" />
            <h2 className="text-xl font-bold text-emerald-900 font-serif">Your Cart</h2>
            <span className="text-sm font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              {itemCount} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-100 rounded-full transition-colors text-emerald-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-emerald-300" />
              </div>
              <div>
                <p className="text-lg font-medium text-emerald-900">Your cart is empty</p>
                <p className="text-sm text-emerald-700">Add some herbal magic to get started!</p>
              </div>
              <button
                onClick={onClose}
                className="text-emerald-700 font-semibold text-sm underline underline-offset-4 hover:text-emerald-900 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {cartItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-4 group"
                >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-emerald-50 flex-shrink-0 border border-emerald-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-emerald-900 truncate">{item.name}</h3>
                  <p className="text-xs text-emerald-600 mb-2">{item.category}</p>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-emerald-100 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-emerald-50 rounded text-emerald-700 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-emerald-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-emerald-50 rounded text-emerald-700 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-emerald-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-900">₹{item.price * item.quantity}</p>
                  <p className="text-[10px] text-emerald-500">₹{item.price} ea.</p>
                </div>
              </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-emerald-50 bg-emerald-50/30 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-emerald-700">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-emerald-700">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-emerald-900 pt-2 border-t border-emerald-100">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all transform active:scale-[0.98] shadow-lg shadow-emerald-200"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
