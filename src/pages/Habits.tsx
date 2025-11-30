import { useState } from "react";
import { Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly" | "monthly";
  currentStreak: number;
  longestStreak: number;
  completedDays: string[];
  category: string;
}

const Habits = () => {
  const [habits] = useState<Habit[]>([
    {
      id: "1",
      name: "Morning Exercise",
      frequency: "daily",
      currentStreak: 12,
      longestStreak: 25,
      completedDays: ["2025-11-25", "2025-11-26", "2025-11-27"],
      category: "Health",
    },
    {
      id: "2",
      name: "Read 30 minutes",
      frequency: "daily",
      currentStreak: 8,
      longestStreak: 15,
      completedDays: ["2025-11-25", "2025-11-27"],
      category: "Study",
    },
    {
      id: "3",
      name: "Meditation",
      frequency: "daily",
      currentStreak: 5,
      longestStreak: 10,
      completedDays: ["2025-11-26"],
      category: "Health",
    },
  ]);

  const getDaysInMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const { daysInMonth, firstDay } = getDaysInMonth();
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-heading font-bold text-gradient mb-2">
                Habit Tracker
              </h1>
              <p className="text-muted-foreground">Build consistency, one day at a time</p>
            </div>
            <Button className="gradient-primary text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Habit
            </Button>
          </div>
        </motion.div>

        <div className="space-y-6">
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Habit Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-heading font-semibold mb-1">
                          {habit.name}
                        </h3>
                        <div className="flex gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {habit.category}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {habit.frequency}
                          </span>
                        </div>
                      </div>
                      <TrendingUp className="h-5 w-5 text-success" />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
                        <p className="text-2xl font-bold text-primary">
                          🔥 {habit.currentStreak} days
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Longest Streak</p>
                        <p className="text-2xl font-bold">
                          {habit.longestStreak} days
                        </p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">This Month</span>
                        <span className="font-medium">{habit.completedDays.length}/{daysInMonth} days</span>
                      </div>
                      <Progress 
                        value={(habit.completedDays.length / daysInMonth) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>

                  {/* Mini Calendar */}
                  <div className="lg:w-80">
                    <p className="text-sm text-muted-foreground mb-3">November 2025</p>
                    <div className="grid grid-cols-7 gap-1">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                        <div key={day} className="text-center text-xs text-muted-foreground p-1">
                          {day}
                        </div>
                      ))}
                      {Array(firstDay).fill(null).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {calendarDays.map((day) => {
                        const dateStr = `2025-11-${day.toString().padStart(2, '0')}`;
                        const isCompleted = habit.completedDays.includes(dateStr);
                        const isToday = day === new Date().getDate();

                        return (
                          <div
                            key={day}
                            className={`
                              aspect-square flex items-center justify-center text-xs rounded-md
                              ${isCompleted ? "bg-primary text-primary-foreground font-semibold" : ""}
                              ${isToday && !isCompleted ? "ring-2 ring-primary" : ""}
                              ${!isCompleted && !isToday ? "hover:bg-muted" : ""}
                            `}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Habits;
