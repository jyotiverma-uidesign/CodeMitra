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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 z-10 text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
          </motion.div>

          {/* Previous button */}
          {hasPrevious && (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-6 z-10 text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </motion.div>
          )}

          {/* Image container */}
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-5xl max-h-[85vh] mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              src={currentItem.image_url}
              alt={currentItem.title}
              className="max-h-[70vh] w-auto mx-auto rounded-2xl object-contain shadow-2xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />

            {/* Info overlay */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl"
            >
              <div className="text-center">
                <motion.span
                  className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-white/20 backdrop-blur-sm text-white mb-3 capitalize border border-white/20"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentItem.category}
                </motion.span>
                <motion.h3
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentItem.title}
                </motion.h3>

                {currentItem.description && (
                  <motion.p
                    className="text-white/90 max-w-2xl mx-auto leading-relaxed"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {currentItem.description}
                  </motion.p>
                )}

                <motion.p
                  className="text-white/70 text-sm mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {currentIndex + 1} / {items.length}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Next button */}
          {hasNext && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-6 z-10 text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryLightbox;
