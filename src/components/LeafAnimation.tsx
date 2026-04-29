import React from "react";
import { motion } from "motion/react";
import { Leaf } from "lucide-react";

const LeafAnimation: React.FC = () => {
  // Create an array of 15 leaves with random properties
  const leaves = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: Math.random() * 10 + 10,
    rotate: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ 
            top: -50, 
            left: `${leaf.left}%`, 
            rotate: leaf.rotate,
            opacity: 0 
          }}
          animate={{ 
            top: "110%", 
            left: `${leaf.left + (Math.random() * 10 - 5)}%`,
            rotate: leaf.rotate + 720,
            opacity: [0, 0.4, 0.4, 0]
          }}
          transition={{ 
            duration: leaf.duration, 
            repeat: Infinity, 
            delay: leaf.delay,
            ease: "linear"
          }}
          className="absolute text-emerald-600/10"
          style={{ width: leaf.size, height: leaf.size }}
        >
          <Leaf size={leaf.size} />
        </motion.div>
      ))}
    </div>
  );
};

export default LeafAnimation;
