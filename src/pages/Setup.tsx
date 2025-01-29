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

  const searchProduct = async () => {
    // For now, we'll use a placeholder image based on the product name
    // In a real implementation, this would call an API to fetch product images
    const placeholderImage = `https://source.unsplash.com/featured/?${encodeURIComponent(productName)}`;
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

    localStorage.setItem('productDetails', JSON.stringify({
      name: productName,
      image: productImage,
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
              />
            </div>
          )}

          <Button type="submit" className="w-full bg-mint-DEFAULT hover:bg-mint-dark">
            Start Saving
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Setup;