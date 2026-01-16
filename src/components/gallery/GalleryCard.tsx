import { motion } from "framer-motion";

interface GalleryCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  onClick: () => void;
}

const GalleryCard = ({
  title,
  description,
  imageUrl,
  category,
  isFeatured,
  onClick,
}: GalleryCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`group relative cursor-pointer overflow-hidden rounded-xl bg-card border border-border ${
        isFeatured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary mb-2 capitalize">
          {category}
        </span>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {description}
          </p>
        )}
      </div>

      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
          Featured
        </div>
      )}
    </motion.div>
  );
};

export default GalleryCard;
