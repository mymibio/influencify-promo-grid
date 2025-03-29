
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Import blog data
import { blogPosts } from "@/data/blog-posts";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [currentCategory, setCurrentCategory] = useState("all");
  
  const categories = [
    "all",
    "link in bio",
    "monetization",
    "social media",
    "influencer marketing",
    "analytics",
    "case studies",
    "tips & tricks",
  ];
  
  useEffect(() => {
    const results = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = currentCategory === "all" || post.category === currentCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredPosts(results);
  }, [searchTerm, currentCategory]);
  
  return (
    <div className="container py-16 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-4">Influencify Blog</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Insights, tips, and strategies for creators and influencers
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
        <Input
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        
        <div className="flex overflow-x-auto gap-2 pb-2 max-w-full">
          {categories.map((category) => (
            <Button
              key={category}
              variant={currentCategory === category ? "default" : "outline"}
              className={currentCategory === category ? "bg-brand-purple" : ""}
              onClick={() => setCurrentCategory(category)}
              size="sm"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold mb-2">No posts found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setCurrentCategory("all");
            }}
            className="mt-4"
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col h-full">
              <div className="aspect-video bg-muted overflow-hidden">
                <img 
                  src={post.image || "/placeholder.svg"} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-muted font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.date}
                  </span>
                </div>
                <CardTitle className="line-clamp-2 hover:text-brand-purple transition-colors">
                  <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-2 flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" asChild className="px-0 text-brand-purple">
                  <Link to={`/blogs/${post.slug}`}>Read More →</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <div className="flex justify-center mt-12">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
};

export default Blogs;
