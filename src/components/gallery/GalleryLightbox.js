import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
const GalleryLightbox = ({ isOpen, onClose, currentItem, items, onPrevious, onNext, }) => {
    if (!currentItem)
        return null; // ✅ null-safe
    const currentIndex = items.findIndex((item) => item.id === currentItem.id);
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < items.length - 1;
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm", onClick: onClose, children: [_jsx(Button, { variant: "ghost", size: "icon", className: "absolute top-4 right-4 z-10 text-foreground hover:bg-muted", onClick: onClose, children: _jsx(X, { className: "h-6 w-6" }) }), hasPrevious && (_jsx(Button, { variant: "ghost", size: "icon", className: "absolute left-4 z-10 text-foreground hover:bg-muted", onClick: (e) => {
                        e.stopPropagation();
                        onPrevious();
                    }, children: _jsx(ChevronLeft, { className: "h-8 w-8" }) })), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.2 }, className: "max-w-4xl max-h-[85vh] mx-4", onClick: (e) => e.stopPropagation(), children: [_jsx("img", { src: currentItem.image_url, alt: currentItem.title, className: "max-h-[70vh] w-auto mx-auto rounded-lg object-contain" }), _jsxs("div", { className: "mt-4 text-center", children: [_jsx("span", { className: "inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary mb-2 capitalize", children: currentItem.category }), _jsx("h3", { className: "text-xl font-semibold text-foreground", children: currentItem.title }), currentItem.description && (_jsx("p", { className: "text-muted-foreground mt-2 max-w-lg mx-auto", children: currentItem.description })), _jsxs("p", { className: "text-sm text-muted-foreground mt-3", children: [currentIndex + 1, " / ", items.length] })] })] }, currentItem.id), hasNext && (_jsx(Button, { variant: "ghost", size: "icon", className: "absolute right-4 z-10 text-foreground hover:bg-muted", onClick: (e) => {
                        e.stopPropagation();
                        onNext();
                    }, children: _jsx(ChevronRight, { className: "h-8 w-8" }) }))] })) }));
};
export default GalleryLightbox;
