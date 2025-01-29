import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Calculator, Target, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface SavingsGoal {
  targetAmount: number;
  deadline: string;
  currentAmount: number;
}

const SavingsCalculator = () => {
  const { toast } = useToast();
  const [goal, setGoal] = useState<SavingsGoal>(() => {
    const saved = localStorage.getItem('savingsGoal');
    return saved ? JSON.parse(saved) : {
      targetAmount: 25000,
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      currentAmount: 0
    };
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    localStorage.setItem('savingsGoal', JSON.stringify(goal));
    const newProgress = (goal.currentAmount / goal.targetAmount) * 100;
    setProgress(newProgress);

    // Check for achievements
    if (newProgress >= 10 && progress < 10) {
      toast({
        title: "🎉 Achievement Unlocked!",
        description: "10% saved! Keep going!",
      });
    }
  }, [goal, progress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoal(prev => ({
      ...prev,
      [name]: name === 'currentAmount' || name === 'targetAmount' ? Number(value) : value
    }));
  };

  const calculateDailySavings = () => {
    const deadlineDate = new Date(goal.deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const remaining = goal.targetAmount - goal.currentAmount;
    return Math.ceil(remaining / daysLeft);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg animate-slide-up">
      <h2 className="text-2xl font-display text-neutral-900 mb-6 flex items-center gap-2">
        <Calculator className="w-6 h-6 text-mint-DEFAULT" />
        Savings Calculator
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Target Amount (UAH)</label>
          <div className="relative">
            <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <Input
              type="number"
              name="targetAmount"
              value={goal.targetAmount}
              onChange={handleInputChange}
              className="pl-10"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Current Savings (UAH)</label>
          <Input
            type="number"
            name="currentAmount"
            value={goal.currentAmount}
            onChange={handleInputChange}
            className="w-full"
            min="0"
            max={goal.targetAmount}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Target Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <Input
              type="date"
              name="deadline"
              value={goal.deadline}
              onChange={handleInputChange}
              className="pl-10"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm text-neutral-600 mb-2">
            <span>Progress</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-neutral-100" indicatorClassName="bg-mint-DEFAULT animate-progress-fill" />
        </div>

        <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
          <h3 className="text-lg font-display text-neutral-800 mb-2">Daily Target</h3>
          <p className="text-2xl font-bold text-mint-DEFAULT">
            {calculateDailySavings()} UAH
          </p>
          <p className="text-sm text-neutral-600 mt-1">per day to reach your goal</p>
        </div>

        <Button 
          className="w-full bg-coral-DEFAULT hover:bg-coral-dark text-white"
          onClick={() => {
            toast({
              title: "Progress Saved!",
              description: "Keep up the great work!",
            });
          }}
        >
          Save Progress
        </Button>
      </div>
    </div>
  );
};

export default SavingsCalculator;