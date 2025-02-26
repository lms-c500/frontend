import { motion } from "framer-motion";

export const DocumentScanner = () => {
  return (
    <div className="relative w-full h-96 bg-gray-200 border-2 border-gray-400 overflow-hidden flex justify-center items-center">
      <svg className="w-3/4 h-5/6 bg-white shadow-lg" viewBox="0 0 400 500">
        <rect width="100%" height="100%" fill="white" stroke="black" strokeWidth="2" />
        {/* Moving Scan Beam */}
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="50"
          fill="rgba(0, 255, 0, 0.3)"
          initial={{ y: 0 }}
          animate={{ y: [0, 450, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default DocumentScanner;

