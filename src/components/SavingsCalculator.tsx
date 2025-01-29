import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Calculator } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
        Savings Progress
      </h2>
      
      <div className="space-y-4">
        <div className="mt-6">
          <div className="flex justify-between text-sm text-neutral-600 mb-2">
            <span>Progress</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <Progress 
            value={progress} 
            className={cn(
              "h-2 bg-neutral-100",
              "before:animate-progress-fill"
            )}
          />
        </div>

        <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
          <h3 className="text-lg font-display text-neutral-800 mb-2">Daily Target</h3>
          <p className="text-2xl font-bold text-mint-DEFAULT">
            {calculateDailySavings()} UAH
          </p>
          <p className="text-sm text-neutral-600 mt-1">per day to reach your goal</p>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-600">Target Amount:</span>
            <span className="font-medium">{goal.targetAmount} UAH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Current Savings:</span>
            <span className="font-medium">{goal.currentAmount} UAH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Target Date:</span>
            <span className="font-medium">{new Date(goal.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;