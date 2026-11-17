import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import type { Metadata } from "next";
import { Suspense } from "react";
import BlogList from "@/components/blog-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, life, and more.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function BlogPage() {
  const posts = [...allPosts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Blog{" "}
          <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {posts.length} posts
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          My thoughts on software development, life, and more.
        </p>
      </BlurFade>

      <Suspense fallback={<div className="py-8 text-sm text-muted-foreground">Loading posts...</div>}>
        <BlogList posts={posts} />
      </Suspense>
    </section>
  );
}
