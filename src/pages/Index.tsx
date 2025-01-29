import SavingsCalculator from "@/components/SavingsCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display text-neutral-900 mb-4">
            Save Smart, Get Your Gadget
          </h1>
          <p className="text-lg text-neutral-600">
            Track your savings journey and achieve your tech goals faster
          </p>
        </div>
        
        <SavingsCalculator />
      </div>
    </div>
  );
};

export default Index;