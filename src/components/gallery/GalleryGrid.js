import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import GalleryCard from "./GalleryCard";
import GalleryLightbox from "../../components/gallery/GalleryLightbox";
const GalleryGrid = ({ items }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const openLightbox = (item) => {
        setCurrentItem(item);
        setLightboxOpen(true);
    };
    const closeLightbox = () => {
        setLightboxOpen(false);
        setCurrentItem(null);
    };
    const goToPrevious = () => {
        if (!currentItem)
            return;
        const idx = items.findIndex((i) => i.id === currentItem.id);
        if (idx > 0)
            setCurrentItem(items[idx - 1]);
    };
    const goToNext = () => {
        if (!currentItem)
            return;
        const idx = items.findIndex((i) => i.id === currentItem.id);
        if (idx < items.length - 1)
            setCurrentItem(items[idx + 1]);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: _jsx(AnimatePresence, { children: items.map((item) => (_jsx(GalleryCard, { id: item.id, title: item.title, description: item.description ?? "", imageUrl: item.image_url, category: item.category, isFeatured: item.is_featured ?? false, onClick: () => openLightbox(item) }, item.id))) }) }), _jsx(GalleryLightbox, { isOpen: lightboxOpen, currentItem: currentItem, items: items, onClose: closeLightbox, onPrevious: goToPrevious, onNext: goToNext })] }));
};
export default GalleryGrid;
