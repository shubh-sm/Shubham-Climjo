import React from "react";
import { Product } from "../types";
import { Plus, Heart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white rounded-[32px] overflow-hidden border border-emerald-50 hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500"
    >
      {/* Top Badge */}
      <div 
        className="absolute top-4 left-4 z-10 flex flex-col gap-2"
        style={{ transform: "translateZ(50px)" }}
      >
        {product.featured && (
          <div className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            Best Seller
          </div>
        )}
      </div>

      {/* Image Container */}
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-emerald-50"
        style={{ transform: "translateZ(30px)" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        
        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-emerald-800 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white">
          <Heart className="w-5 h-5" />
        </button>

        {/* Quick Add Button */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white hover:bg-emerald-700 hover:text-white text-emerald-900 py-3 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl shadow-black/5 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75"
        >
          <Plus className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Info Container */}
      <div 
        className="p-6"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">{product.category}</p>
            <h3 className="font-serif text-xl font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-emerald-900">₹{product.price}</p>
          </div>
        </div>
        
        <p className="text-sm text-emerald-800/60 line-clamp-2 mb-4 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-emerald-400 text-emerald-400" />
            ))}
            <span className="text-[10px] font-bold text-emerald-800/40 ml-2">4.8 (120+)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
