import { motion } from "framer-motion";

interface GalleryCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  onClick: () => void;
  index?: number; // For staggered animations
}

const GalleryCard = ({
  title,
  description,
  imageUrl,
  category,
  isFeatured,
  onClick,
  index = 0,
}: GalleryCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1, // Staggered animation
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className={`group relative cursor-pointer overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 ${
        isFeatured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Glassmorphism overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
        initial={{ y: 20, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.span
          className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm text-white mb-2 capitalize border border-white/20"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {category}
        </motion.span>
        <motion.h3
          className="text-lg font-semibold text-white mb-1"
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {title}
        </motion.h3>
        {description && (
          <motion.p
            className="text-sm text-white/90 line-clamp-2"
            initial={{ x: -10, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>

      {/* Featured badge */}
      {isFeatured && (
        <motion.div
          className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          Featured
        </motion.div>
      )}

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
};

export default GalleryCard;
