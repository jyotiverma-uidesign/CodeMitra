import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import GalleryCard from "./GalleryCard";
import GalleryLightbox from "../../components/gallery/GalleryLightbox";

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

interface GalleryGridProps {
  items: GalleryItem[];
}

const GalleryGrid = ({ items }: GalleryGridProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {items.map((item, index) => (
            <GalleryCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description ?? ""} // ✅ null-safe
              imageUrl={item.image_url}
              category={item.category}
              isFeatured={item.is_featured ?? false} // ✅ null-safe
              index={index} // For staggered animations
              onClick={() => openLightbox(item)}
            />
          ))}
        </AnimatePresence>
      </div>

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

export default GalleryGrid;
