"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Globe, Facebook, Twitter, Youtube } from "lucide-react";
import { Card } from "@/components/ui/card";

// Social media links
const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/gangeshwar.singh.1217",
    color: "text-[#1877F2] hover:text-[#1877F2]/80"
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/gangeshwarsingh",
    color: "text-[#1DA1F2] hover:text-[#1DA1F2]/80"
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/@gangeshwarsinghips814",
    color: "text-[#FF0000] hover:text-[#FF0000]/80"
  }
];

export default function Contact() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070"
          alt="Hero background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 flex flex-col items-center text-white">
          <div className="mb-8 relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <Image
              src="https://www.gangeshwarsingh.co.in/cimage35/113288gangeshwa_singh_08.jpg"
              alt="Dr. Rajesh Kumar"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">Contact Dr. Rajesh Kumar</h1>
          <p className="text-xl mb-6">Get in Touch</p>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 space-y-8">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Mobile & WhatsApp</h3>
                <p className="text-muted-foreground">
                  <Link href="tel:+918250408589" className="hover:text-primary">
                    +91 82504 08589
                  </Link>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-muted-foreground">
                  <Link href="mailto:singhgangeswar2017@gmail.com" className="hover:text-primary">
                    singhgangeswar2017@gmail.com
                  </Link>
                </p>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Website</h3>
                <p className="text-muted-foreground">
                  <Link href="https://www.gangeshwarsingh.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    www.gangeshwarsingh.co.in
                  </Link>
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Social Media</h3>
                <div className="flex gap-6">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors ${social.color}`}
                    >
                      <social.icon size={28} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <p className="text-muted-foreground">
                  JC-4/1B, JC Block,<br />
                  Sector – II, Salt Lake,<br />
                  Spring Meadows Co. Operative Housing Society Ltd.<br />
                  Kolkata - 700 106,<br />
                  West Bengal, India
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}