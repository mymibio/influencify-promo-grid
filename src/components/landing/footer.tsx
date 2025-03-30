
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Facebook, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 left-20 w-80 h-80 bg-brand-sky-blue rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center font-bold text-xl mb-4">
              <span className="text-brand-blue font-serif">MYMI.bio</span>
            </Link>
            <p className="text-sm text-gray-600 mb-6 max-w-xs">
              The ultimate tool for influencers to monetize their Instagram bio with a beautiful link page.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 bg-brand-sky-blue text-brand-blue rounded-full flex items-center justify-center hover:bg-brand-light-blue transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-brand-sky-blue text-brand-blue rounded-full flex items-center justify-center hover:bg-brand-light-blue transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-brand-sky-blue text-brand-blue rounded-full flex items-center justify-center hover:bg-brand-light-blue transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-brand-sky-blue text-brand-blue rounded-full flex items-center justify-center hover:bg-brand-light-blue transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/features" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/examples" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Examples
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Guides
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} MYMI.bio. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-gray-600 hover:text-brand-blue transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-brand-blue transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="text-sm text-gray-600 hover:text-brand-blue transition-colors">
              Cookies
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-400 flex items-center justify-center">
          Made with <Heart className="h-3 w-3 mx-1 text-red-400" /> by the MYMI.bio team
        </div>
      </div>
    </footer>
  );
};

export default Footer;
