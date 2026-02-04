import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Images, Sparkles } from "lucide-react";
import { supabase } from "../components/integration/supabase/client";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import EnhancedGalleryGrid from "../components/gallery/EnhancedGalleryGrid";
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

  const { data: galleryItems, isLoading } = useQuery({
    queryKey: ["gallery-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems?.filter(
          (item) => item.category === activeCategory
        );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 min-h-[60vh] flex items-center overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60" />

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 backdrop-blur-sm mb-6 border border-primary/20">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                Our Gallery
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Explore moments from our coding journey — student projects,
                events, achievements, and more.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 border-b border-border">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="aspect-square rounded-xl"
                  />
                ))}
              </div>
            ) : filteredItems && filteredItems.length > 0 ? (
              <EnhancedGalleryGrid items={filteredItems} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Images className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No images yet
                </h3>
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
