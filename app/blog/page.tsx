import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { format } from 'date-fns';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen px-4 pb-20">
      <div className="absolute inset-x-0 top-0 h-96 bg-aura pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-96 grid-lines pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-4xl mx-auto pt-16 md:pt-24">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Journal</p>
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">Blog</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            DeepFabric updates, tutorials, and insights from the community.
          </p>
        </div>

        {/* Blog Posts */}
        {posts.length === 0 ? (
          <div className="glass-panel p-12 text-center">
            <p className="text-muted-foreground text-lg">
              No blog posts yet. Check back soon for updates!
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                <article className="group card-surface card-hover p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    <span>{post.author}</span>
                    <span className="w-1 h-1 rounded-full bg-primary/50" />
                    <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{post.description}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-primary/[0.07] text-primary font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
