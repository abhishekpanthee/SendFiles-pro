"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import { useMemo } from "react";

const posts = [
  {
    title: "Getting Started with SendFiles Pro",
    excerpt: "Learn how to share files securely using our platform.",
    date: "2024-02-28",
    slug: "getting-started",
  },
  {
    title: "Security Best Practices",
    excerpt: "Tips for keeping your file transfers secure.",
    date: "2024-02-27",
    slug: "security-best-practices",
  },
  {
    title: "What's New in SendFiles Pro",
    excerpt: "Latest features and improvements in our platform.",
    date: "2024-02-26",
    slug: "whats-new",
  },
];

export default function BlogPage() {
  const memoizedPosts = useMemo(() => posts, []); // Memoizing posts

  return (
    <>
      <Head>
        <title>Blog - FileShare Pro</title>
        <meta name="description" content="Latest updates, guides, and security tips from the FileShare Pro team." />
      </Head>

      <div className="px-4 sm:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground">
            Latest updates and guides from our team
          </p>
        </motion.div>

        {/* Blog posts grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memoizedPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">{post.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString()}
                      </time>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm sm:text-base">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
