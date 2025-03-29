
import { Button } from "@/components/ui/button";

const Demo = () => {
  return (
    <div className="container py-16 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8">Interactive Demo</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-muted rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Experience Influencify in Action</h2>
          <p className="text-lg mb-6">
            Try our interactive demo to see how Influencify can transform your social media presence and help you monetize your audience.
          </p>
          
          <div className="aspect-video bg-background rounded-md border flex items-center justify-center mb-6">
            <div className="text-center">
              <p className="text-xl font-medium mb-4">Demo Visualization</p>
              <Button className="bg-brand-purple hover:bg-brand-dark-purple">
                Launch Interactive Demo
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Note: This is a simplified version of the platform. Sign up for free to access all features.
          </p>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-3">Key Features to Try</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-brand-purple">✓</span>
                <span>Customizable profile with your brand colors</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand-purple">✓</span>
                <span>Add unlimited product links with analytics</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand-purple">✓</span>
                <span>Integrate discount codes and affiliate links</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand-purple">✓</span>
                <span>Mobile-optimized view for your audience</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">What Our Users Are Saying</h3>
            <div className="bg-accent p-4 rounded-md italic">
              "Influencify has completely transformed how I monetize my Instagram following. I've seen a 300% increase in click-through rates since switching!"
              <p className="font-medium mt-2">— Sarah J., Fashion Influencer</p>
            </div>
          </div>
          
          <div className="pt-6 border-t">
            <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
            <p className="mb-4">
              Create your own Influencify profile in minutes and start monetizing your audience today.
            </p>
            <div className="flex gap-4">
              <Button className="bg-brand-purple hover:bg-brand-dark-purple">
                Sign Up for Free
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
