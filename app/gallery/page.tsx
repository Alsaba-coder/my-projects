"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { YoutubeIcon } from "lucide-react";

// Categories for the gallery
const categories = ["All", "Events", "Poetry Sessions", "Awards", "Media"];

// Sample gallery items - replace with actual images and data
const galleryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1531053270060-6643c8e70e8f?w=800&auto=format&fit=crop&q=60",
    title: "Poetry Recitation Event",
    category: "Poetry Sessions",
    description: "Annual poetry recitation at Delhi Literature Festival",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=60",
    title: "Book Launch",
    category: "Events",
    description: "Launch ceremony of latest poetry collection",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=60",
    title: "Award Ceremony",
    category: "Awards",
    description: "Receiving National Literary Award 2023",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1560523159-6b681a1e1852?w=800&auto=format&fit=crop&q=60",
    title: "Television Interview",
    category: "Media",
    description: "Interview on National Television",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    title: "Police Academy Lecture",
    category: "Events",
    description: "Special lecture on Literature and Service",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=60",
    title: "Poetry Workshop",
    category: "Poetry Sessions",
    description: "Interactive workshop with young poets",
  },
];

// Featured videos with proper YouTube information
const featuredVideos = [
  {
    id: "video1",
    title: "Poetry Recitation - Path Ki Pehchaan",
    videoId: "JBVddIySeHA",
    thumbnail: "https://img.youtube.com/vi/JBVddIySeHA/maxresdefault.jpg",
  },
  {
    id: "video2",
    title: "Interview on Literature Today",
    videoId: "cSWu5YOPvBE",
    thumbnail: "https://img.youtube.com/vi/cSWu5YOPvBE/maxresdefault.jpg",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<(typeof featuredVideos)[0] | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Photo Gallery</h1>
        
        {/* Featured Videos Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <YoutubeIcon className="text-red-600" />
            Featured Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredVideos.map((video) => (
              <div
                key={video.id}
                className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <YoutubeIcon size={48} className="text-red-600" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Preview Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedImage?.title}</DialogTitle>
              <DialogDescription>
                {selectedImage?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              {selectedImage && (
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Video Preview Dialog */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedVideo?.title}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video w-full">
              {selectedVideo && (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}