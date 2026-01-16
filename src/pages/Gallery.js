import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { supabase } from "../components/integration/supabase/client";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import GalleryGrid from "../components/gallery/GalleryGrid";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
const categories = [
    { id: "all", label: "All" },
    { id: "projects", label: "Student Projects" },
    { id: "events", label: "Events" },
    { id: "team", label: "Team" },
    { id: "achievements", label: "Achievements" },
];
const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const { data: galleryItems = [], isLoading } = useQuery({
        queryKey: ["gallery-items"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("gallery_items")
                .select("*")
                .order("order_index", { ascending: true })
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return data ?? [];
        },
    });
    const filteredItems = activeCategory === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory);
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [_jsx(Navbar, {}), _jsxs("main", { className: "flex-1", children: [_jsxs("section", { className: "relative py-20 px-4 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" }), _jsx("div", { className: "container mx-auto relative z-10 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 mx-auto", children: _jsx(Images, { className: "h-8 w-8 text-primary" }) }), _jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4", children: "Our Gallery" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Explore moments from our coding journey \u2013 projects, events, achievements, and more." })] }) })] }), _jsx("section", { className: "py-8 px-4 border-b", children: _jsx("div", { className: "container mx-auto flex flex-wrap justify-center gap-2", children: categories.map((c) => (_jsx(Button, { variant: activeCategory === c.id ? "default" : "outline", onClick: () => setActiveCategory(c.id), children: c.label }, c.id))) }) }), _jsx("section", { className: "py-12 px-4", children: _jsx("div", { className: "container mx-auto", children: isLoading ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: Array.from({ length: 8 }).map((_, i) => (_jsx(Skeleton, { className: "aspect-square rounded-xl" }, i))) })) : filteredItems.length > 0 ? (_jsx(GalleryGrid, { items: filteredItems })) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-20", children: [_jsx(Images, { className: "h-16 w-16 text-muted-foreground mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: "No images yet" }), _jsx("p", { className: "text-muted-foreground", children: "Gallery items will appear here once added." })] })) }) })] }), _jsx(Footer, {})] }));
};
export default Gallery;
