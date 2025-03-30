
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();

  const handleDemoSignup = () => {
    toast.success("Demo mode activated. Redirecting to dashboard...");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-sm border">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Demo Mode</h1>
            <p className="text-muted-foreground mt-2">
              Authentication has been removed from this application
            </p>
          </div>
          
          <div className="space-y-6">
            <Button 
              onClick={handleDemoSignup}
              className="w-full bg-[#5271FF] hover:bg-[#4262EA] text-white"
            >
              Continue to Dashboard
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Back to{" "}
              <Link to="/" className="text-[#5271FF] hover:underline">
                Home Page
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
