
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Turn Your Instagram Bio Into a
              <span className="text-brand-purple"> Money-Making Machine</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
              Create a beautiful product showcase that converts your followers into customers.
              Share exclusive discounts and promotions in one stunning link.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/signup">
              <Button className="bg-brand-purple hover:bg-brand-dark-purple text-white px-8 py-2 rounded-lg">
                Get Started — It's Free
              </Button>
            </Link>
            <Link to="/examples">
              <Button variant="outline">
                See Examples
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
