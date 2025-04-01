
import { Check } from "lucide-react";

const features = [
  {
    title: "Beautiful Pinterest-Style Grid",
    description: "Showcase your promotions in a visually stunning, responsive layout that captures attention."
  },
  {
    title: "Multiple Card Formats",
    description: "Choose between 1:1 square cards or 9:16 vertical cards to best showcase your products."
  },
  {
    title: "Easy Coupon Sharing",
    description: "Provide exclusive discount codes to your followers with one-click copy functionality."
  },
  {
    title: "Custom Branding",
    description: "Match your page to your personal brand with customizable colors, fonts, and layout options."
  },
  {
    title: "Performance Analytics",
    description: "Track clicks, conversions, and engagement to optimize your promotional strategy."
  },
  {
    title: "Direct Product Links",
    description: "Send followers directly to product pages with trackable affiliate links."
  }
];

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6 transition-all hover:shadow-md">
    <div className="flex items-start gap-4">
      <div className="mt-1 bg-brand-purple/10 rounded-full p-1">
        <Check className="h-5 w-5 text-brand-purple" />
      </div>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
    </div>
  </div>
);

const Features = () => {
  return (
    <section className="py-16 bg-gray-50" id="features">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything You Need to <span className="text-brand-purple">Monetize Your Following</span>
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform is designed specifically for influencers looking to maximize their promotional opportunities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
