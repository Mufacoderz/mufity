import { useState } from "react";
import { Plus, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  category: string;
  milestones: { id: string; title: string; completed: boolean }[];
  deadline: string;
}

const Goals = () => {
  const [goals] = useState<Goal[]>([
    {
      id: "1",
      title: "Complete 100 Tasks",
      description: "Finish 100 tasks across all categories",
      target: 100,
      current: 67,
      unit: "tasks",
      category: "Productivity",
      milestones: [
        { id: "1-1", title: "Complete 25 tasks", completed: true },
        { id: "1-2", title: "Complete 50 tasks", completed: true },
        { id: "1-3", title: "Complete 75 tasks", completed: false },
        { id: "1-4", title: "Complete 100 tasks", completed: false },
      ],
      deadline: "2025-12-31",
    },
    {
      id: "2",
      title: "30-Day Meditation Streak",
      description: "Meditate every day for 30 consecutive days",
      target: 30,
      current: 12,
      unit: "days",
      category: "Health",
      milestones: [
        { id: "2-1", title: "7-day streak", completed: true },
        { id: "2-2", title: "14-day streak", completed: false },
        { id: "2-3", title: "21-day streak", completed: false },
        { id: "2-4", title: "30-day streak", completed: false },
      ],
      deadline: "2025-12-25",
    },
    {
      id: "3",
      title: "Read 12 Books",
      description: "Read one book per month throughout the year",
      target: 12,
      current: 5,
      unit: "books",
      category: "Study",
      milestones: [
        { id: "3-1", title: "Read 3 books", completed: true },
        { id: "3-2", title: "Read 6 books", completed: false },
        { id: "3-3", title: "Read 9 books", completed: false },
        { id: "3-4", title: "Read 12 books", completed: false },
      ],
      deadline: "2025-12-31",
    },
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Productivity":
        return "bg-primary/10 text-primary";
      case "Health":
        return "bg-success/10 text-success";
      case "Study":
        return "bg-info/10 text-info";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-heading font-bold text-gradient mb-2">
                Goals
              </h1>
              <p className="text-muted-foreground">Set and track your long-term goals</p>
            </div>
            <Button className="gradient-primary text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>
        </motion.div>

        <div className="space-y-6">
          {goals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            const daysLeft = Math.ceil(
              (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-heading font-semibold">
                          {goal.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-3">{goal.description}</p>
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(goal.category)}`}>
                          {goal.category}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {daysLeft} days left
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">
                        {Math.round(progress)}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {goal.current} / {goal.target} {goal.unit}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <Progress value={progress} className="h-3" />
                  </div>

                  {/* Milestones */}
                  <div>
                    <p className="text-sm font-medium mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Milestones
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {goal.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className={`
                            flex items-center gap-3 p-3 rounded-lg border-2
                            ${milestone.completed 
                              ? "bg-success/10 border-success" 
                              : "bg-muted/50 border-border"
                            }
                          `}
                        >
                          <div className={`
                            h-5 w-5 rounded-full flex items-center justify-center
                            ${milestone.completed 
                              ? "bg-success text-white" 
                              : "bg-muted"
                            }
                          `}>
                            {milestone.completed && "✓"}
                          </div>
                          <span className={`text-sm ${milestone.completed ? "font-medium" : ""}`}>
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Goals;
