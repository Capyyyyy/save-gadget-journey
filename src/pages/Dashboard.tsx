import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SavingsCalculator from '@/components/SavingsCalculator';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProductDetails {
  name: string;
  image: string;
  price?: number;
  location?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [newSavingsAmount, setNewSavingsAmount] = useState<string>('');
  const [isAddingSavings, setIsAddingSavings] = useState(false);
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    const savedDetails = localStorage.getItem('productDetails');
    if (!savedDetails) {
      navigate('/setup');
      return;
    }
    const details = JSON.parse(savedDetails);
    setProductDetails(details);
    
    // Get user's location by IP
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then((data) => {
        const locationStr = `${data.city || 'Unknown City'}, ${data.country_name || 'Unknown Country'}`;
        setLocation(locationStr);
      })
      .catch(() => {
        setLocation('Location unavailable');
      });
  }, [navigate]);

  const handleAddSavings = () => {
    const amount = parseFloat(newSavingsAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive number.",
        variant: "destructive",
      });
      return;
    }

    const savedCalculator = localStorage.getItem('savingsGoal');
    if (savedCalculator) {
      const calculator = JSON.parse(savedCalculator);
      calculator.currentAmount += amount;
      localStorage.setItem('savingsGoal', JSON.stringify(calculator));
      
      toast({
        title: "Savings Added!",
        description: `Added ${amount} UAH to your savings.`,
      });
      
      setNewSavingsAmount('');
      setIsAddingSavings(false);
      window.location.reload();
    }
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
            <p className="text-neutral-600 mt-2">
              {location && `Shopping from ${location}`}
            </p>
          </div>
          <Dialog open={isAddingSavings} onOpenChange={setIsAddingSavings}>
            <DialogTrigger asChild>
              <Button className="bg-mint-DEFAULT hover:bg-mint-dark">
                <Plus className="w-4 h-4 mr-2" />
                Add Savings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Savings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  type="number"
                  placeholder="Amount in UAH"
                  value={newSavingsAmount}
                  onChange={(e) => setNewSavingsAmount(e.target.value)}
                />
                <Button 
                  className="w-full bg-mint-DEFAULT hover:bg-mint-dark"
                  onClick={handleAddSavings}
                >
                  Add to Savings
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-[1fr,300px] gap-6">
          <SavingsCalculator />
          
          <div className="bg-white p-4 rounded-xl shadow-lg">
            {productDetails.image && (
              <img
                src={productDetails.image}
                alt={productDetails.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = `https://source.unsplash.com/featured/?${encodeURIComponent(productDetails.name)},electronics`;
                }}
              />
            )}
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