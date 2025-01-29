import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Setup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [targetAmount, setTargetAmount] = useState('25000');
  const [currentAmount, setCurrentAmount] = useState('0');
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  const searchProduct = async () => {
    const placeholderImage = `https://source.unsplash.com/featured/?${encodeURIComponent(productName)},product`;
    setProductImage(placeholderImage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productImage) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Save product details
    localStorage.setItem('productDetails', JSON.stringify({
      name: productName,
      image: productImage,
    }));

    // Save savings goal
    localStorage.setItem('savingsGoal', JSON.stringify({
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount),
      deadline: deadline,
    }));

    toast({
      title: "Setup Complete!",
      description: "Let's start saving for your " + productName,
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-display text-neutral-900 mb-8 text-center">
          Let's Get Started
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">What are you saving for?</label>
            <Input
              type="text"
              placeholder="e.g., Google Pixel 9"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full"
            />
            <Button
              type="button"
              variant="outline"
              onClick={searchProduct}
              className="w-full mt-2"
            >
              Find Product Image
            </Button>
          </div>

          {productImage && (
            <div className="mt-4">
              <img
                src={productImage}
                alt={productName}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = `https://source.unsplash.com/featured/?${encodeURIComponent(productName)},electronics`;
                }}
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">Target Amount (UAH)</label>
              <Input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full"
                min="0"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700">Current Savings (UAH)</label>
              <Input
                type="number"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="w-full"
                min="0"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700">Target Date</label>
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-mint-DEFAULT hover:bg-mint-dark">
            Start Saving
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Setup;