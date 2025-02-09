export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  author: {
    name: string;
    image?: string;
  };
}

// In-memory storage
const posts: Post[] = [
  {
    id: '1',
    title: "Understanding React Server Components",
    slug: "understanding-react-server-components",
    content: "Full content here...",
    excerpt: "Learn how React Server Components work and how they can improve your application's performance.",
    published: true,
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3",
    author: {
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
    }
  },
  {
    id: '2',
    title: "Building Scalable APIs with Node.js",
    slug: "building-scalable-apis",
    content: "Full content here...",
    excerpt: "Best practices for building scalable and maintainable APIs using Node.js and Express.",
    published: true,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3",
    author: {
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
    }
  },
  {
    id: '3',
    title: "TypeScript Tips and Tricks",
    slug: "typescript-tips-tricks",
    content: "Full content here...",
    excerpt: "Advanced TypeScript features and patterns to improve your code quality.",
    published: true,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3",
    author: {
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
    }
  }
];

export function getAllPosts() {
  return posts.filter(post => post.published);
}

export function getPostBySlug(slug: string) {
  return posts.find(post => post.slug === slug);
}