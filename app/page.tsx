import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Author Bio */}
      <section className="container mx-auto py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <Image
              src="/author.jpg"
              alt="Author"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight">Alsaba Khan</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Software Engineer & Technical Writer
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
              I'm a passionate software engineer with over 10 years of experience.
              I write about web development, software architecture, and best practices.
              Welcome to my corner of the internet!
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <Button>Read My Blog</Button>
              <Button variant="outline">Contact Me</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={post.imageUrl || ''}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{format(post.createdAt, 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>5 min read</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-1">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" className="w-full">Read More</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}