import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalleryCard from "./GalleryCard";
import GalleryLightbox from "./GalleryLightbox";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ✅ SAME TYPE AS Gallery.tsx */
export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  description: string | null;
  is_featured: boolean | null;
  order_index: number | null;
  created_at: string;
}

interface EnhancedGalleryGridProps {
  items: GalleryItem[];
}

const EnhancedGalleryGrid = ({ items }: EnhancedGalleryGridProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP animations for scroll-triggered effects
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.gallery-card');

    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [items]);

  const openLightbox = (item: GalleryItem) => {
    setCurrentItem(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentItem(null);
  };

  const goToPrevious = () => {
    if (!currentItem) return;
    const idx = items.findIndex((i) => i.id === currentItem.id);
    if (idx > 0) setCurrentItem(items[idx - 1]);
  };

  const goToNext = () => {
    if (!currentItem) return;
    const idx = items.findIndex((i) => i.id === currentItem.id);
    if (idx < items.length - 1) setCurrentItem(items[idx + 1]);
  };

  return (
    <>
      {/* Masonry Grid Layout */}
      <motion.div
        ref={gridRef}
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="gallery-card break-inside-avoid"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut"
              }}
            >
              <EnhancedGalleryCard
                id={item.id}
                title={item.title}
                description={item.description ?? ""}
                imageUrl={item.image_url}
                category={item.category}
                isFeatured={item.is_featured ?? false}
                index={index}
                onClick={() => openLightbox(item)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <GalleryLightbox
        isOpen={lightboxOpen}
        currentItem={currentItem}
        items={items}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </>
  );
};

// Enhanced Gallery Card with premium aesthetics
interface EnhancedGalleryCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  onClick: () => void;
  index?: number;
}

const EnhancedGalleryCard = ({
  title,
  description,
  imageUrl,
  category,
  isFeatured,
  onClick,
  index = 0,
}: EnhancedGalleryCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    // GSAP hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(card.querySelector('.card-overlay'), {
        opacity: 1,
        duration: 0.3
      });

      gsap.to(card.querySelector('.card-content'), {
        y: 0,
        opacity: 1,
        duration: 0.4,
        delay: 0.1
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(card.querySelector('.card-overlay'), {
        opacity: 0,
        duration: 0.3
      });

      gsap.to(card.querySelector('.card-content'), {
        y: 20,
        opacity: 0,
        duration: 0.3
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500"
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image Container with Lazy Loading */}
      <div className="relative overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient Overlay */}
        <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500" />

        {/* Glassmorphism Effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Overlay */}
      <motion.div
        className="card-content absolute bottom-0 left-0 right-0 p-6 translate-y-5 opacity-0"
        initial={{ y: 20, opacity: 0 }}
      >
        {/* Category Badge */}
        <motion.span
          className="inline-block px-4 py-2 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-md text-white mb-3 border border-white/30 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {category}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-white mb-2 leading-tight"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        {description && (
          <motion.p
            className="text-sm text-white/90 leading-relaxed line-clamp-2"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>

      {/* Featured Badge */}
      {isFeatured && (
        <motion.div
          className="absolute top-4 right-4 px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-xl border border-white/20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)"
          }}
        >
          ⭐ Featured
        </motion.div>
      )}

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Subtle Border Animation */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-violet-500/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
};

export default EnhancedGalleryGrid;
