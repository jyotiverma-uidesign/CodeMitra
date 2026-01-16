import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { supabase } from "../components/integration/supabase/client";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import GalleryGrid from "../components/gallery/GalleryGrid";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";

/* ✅ SINGLE SOURCE OF TRUTH TYPE */
export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  description: string | null; // null allowed
  is_featured: boolean | null;
  order_index: number | null;
  created_at: string;
}

const categories = [
  { id: "all", label: "All" },
  { id: "projects", label: "Student Projects" },
  { id: "events", label: "Events" },
  { id: "team", label: "Team" },
  { id: "achievements", label: "Achievements" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: galleryItems = [], isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["gallery-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 mx-auto">
                <Images className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
              <p className="text-lg text-muted-foreground">
                Explore moments from our coding journey – projects, events, achievements, and more.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 border-b">
          <div className="container mx-auto flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <Button
                key={c.id}
                variant={activeCategory === c.id ? "default" : "outline"}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-xl" />
                ))}
              </div>
            ) : filteredItems.length > 0 ? (
              <GalleryGrid items={filteredItems} />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <Images className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No images yet</h3>
                <p className="text-muted-foreground">
                  Gallery items will appear here once added.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
