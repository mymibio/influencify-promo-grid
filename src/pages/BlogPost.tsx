
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-posts";

const BlogPost = () => {
  const { slug } = useParams();
  
  // Find the blog post matching the slug
  const post = blogPosts.find(post => post.slug === slug);
  
  // If no post is found, show a not found message
  if (!post) {
    return (
      <div className="container py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Blog Post Not Found</h1>
          <p className="text-lg mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
          <Button asChild className="bg-brand-purple hover:bg-brand-dark-purple">
            <Link to="/blogs">Back to All Posts</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Find related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);
  
  return (
    <div className="container py-16 px-4 md:px-6">
      <Link to="/blogs" className="inline-flex items-center text-brand-purple hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Link>
      
      <article className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              {post.category}
            </div>
          </div>
          
          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
            <img 
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>
        
        <div className="prose max-w-none">
          <p className="lead text-xl mb-6">{post.excerpt}</p>
          
          <div dangerouslySetInnerHTML={{ __html: post.content || '<p>Content coming soon...</p>' }} />
        </div>
        
        <div className="border-t border-b py-6 my-10">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-muted-foreground block mb-1">Share this article</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-sm text-muted-foreground block mb-1">Category</span>
              <Link to={`/blogs?category=${post.category}`} className="text-brand-purple hover:underline">
                {post.category}
              </Link>
            </div>
          </div>
        </div>
        
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2 line-clamp-2">
                      <Link to={`/blogs/${relatedPost.slug}`} className="hover:text-brand-purple transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPost;
