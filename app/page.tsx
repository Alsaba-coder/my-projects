"use client";

import { YoutubeIcon, FacebookIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070"
          alt="Hero background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 flex flex-col items-center text-white">
          <div className="mb-8 relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <Image
              src="https://www.gangeshwarsingh.co.in/cimage35/113288gangeshwa_singh_08.jpg"
              alt="Gangeshwar Singh"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">Gangeshwar Singh</h1>
          <p className="text-xl mb-8">Poet | IPS Officer | Writer</p>
          <div className="flex gap-4">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              Explore Poetry
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              View Profile
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Poetry Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Poetry</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <h3 className="text-xl font-semibold mb-4">पथ की पहचान</h3>
                <p className="text-muted-foreground mb-4">
                  राह चलते यूँ ही रुक जाता हूँ मैं,
                  हर पथ की पहचान करता हूँ...
                </p>
                <Button variant="link">Read More</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest YouTube Video */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Recitation</h2>
          <div className="aspect-video max-w-4xl mx-auto">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/JBVddIySeHA`}
              title="Poetry Recitation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Connect With Me</h2>
          <div className="flex justify-center gap-8">
            <Link href="https://www.facebook.com/gangeshwar.singh.1217" className="hover:text-primary">
              <FacebookIcon size={32} />
            </Link>
            <Link href="https://www.youtube.com/@gangeshwarsinghips814" className="hover:text-primary">
              <YoutubeIcon size={32} />
            </Link>
            <Link href="https://twitter.com/gangeshwarsingh" className="hover:text-primary">
              <TwitterIcon size={32} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}