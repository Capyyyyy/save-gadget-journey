import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SavingsCalculator from '@/components/SavingsCalculator';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProductDetails {
  name: string;
  image: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);

  useEffect(() => {
    const savedDetails = localStorage.getItem('productDetails');
    if (!savedDetails) {
      navigate('/setup');
      return;
    }
    setProductDetails(JSON.parse(savedDetails));
  }, [navigate]);

  const handleAddSavings = () => {
    // This would open a modal or form to add new savings
    toast({
      title: "Coming Soon!",
      description: "This feature will be available in the next update.",
    });
  };

  if (!productDetails) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display text-neutral-900">
              Saving for {productDetails.name}
            </h1>
            <p className="text-neutral-600 mt-2">Track your progress and stay motivated!</p>
          </div>
          <Button onClick={handleAddSavings} className="bg-mint-DEFAULT hover:bg-mint-dark">
            <Plus className="w-4 h-4 mr-2" />
            Add Savings
          </Button>
        </div>

        <div className="grid md:grid-cols-[1fr,300px] gap-6">
          <SavingsCalculator />
          
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <img
              src={productDetails.image}
              alt={productDetails.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              Your Goal
            </h3>
            <p className="text-neutral-600">
              Keep going! You're getting closer to your {productDetails.name}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;