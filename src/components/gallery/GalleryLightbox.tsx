import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null; // ✅ nullable
  image_url: string;
  category: string;
}

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: GalleryItem | null;
  items: GalleryItem[];
  onPrevious: () => void;
  onNext: () => void;
}

const GalleryLightbox = ({
  isOpen,
  onClose,
  currentItem,
  items,
  onPrevious,
  onNext,
}: GalleryLightboxProps) => {
  if (!currentItem) return null; // ✅ null-safe

  const currentIndex = items.findIndex((item) => item.id === currentItem.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-foreground hover:bg-muted"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Previous button */}
          {hasPrevious && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 z-10 text-foreground hover:bg-muted"
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}

          {/* Image container */}
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="max-w-4xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.image_url}
              alt={currentItem.title}
              className="max-h-[70vh] w-auto mx-auto rounded-lg object-contain"
            />

            <div className="mt-4 text-center">
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary mb-2 capitalize">
                {currentItem.category}
              </span>
              <h3 className="text-xl font-semibold text-foreground">{currentItem.title}</h3>

              {currentItem.description && (
                <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                  {currentItem.description}
                </p>
              )}

              <p className="text-sm text-muted-foreground mt-3">
                {currentIndex + 1} / {items.length}
              </p>
            </div>
          </motion.div>

          {/* Next button */}
          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 z-10 text-foreground hover:bg-muted"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryLightbox;
