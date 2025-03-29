
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container py-16 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-6">
            Have questions about Influencify? Want to learn more about our features or pricing? We're here to help!
          </p>
          
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="text-lg font-medium">Email</h3>
              <p>support@influencify.com</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Office</h3>
              <p>123 Creator Ave, Suite 100<br />San Francisco, CA 94107</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Social</h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-brand-purple hover:text-brand-dark-purple">Twitter</a>
                <a href="#" className="text-brand-purple hover:text-brand-dark-purple">Instagram</a>
                <a href="#" className="text-brand-purple hover:text-brand-dark-purple">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
              <Input 
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <Textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us what you need assistance with..."
                rows={5}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-brand-purple hover:bg-brand-dark-purple"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
