import { Calendar, CheckCircle2, Target, Timer, TrendingUp, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Dashboard = () => {
  const today = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const stats = [
    { label: "Tasks Today", value: "8", icon: CheckCircle2, color: "text-primary" },
    { label: "Habits Done", value: "5/7", icon: Zap, color: "text-accent" },
    { label: "Focus Hours", value: "3.5h", icon: Timer, color: "text-secondary" },
    { label: "Weekly Streak", value: "12", icon: TrendingUp, color: "text-success" },
  ];

  const todayTasks = [
    { id: 1, title: "Complete project proposal", priority: "high", done: true },
    { id: 2, title: "Review code changes", priority: "medium", done: false },
    { id: 3, title: "Team meeting at 2 PM", priority: "high", done: false },
  ];

  const habits = [
    { id: 1, name: "Morning Exercise", done: true, streak: 12 },
    { id: 2, name: "Read 30 minutes", done: true, streak: 8 },
    { id: 3, name: "Meditation", done: false, streak: 5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-heading font-bold mb-2 text-gradient">
            Welcome Back! 🔥
          </h1>
          <p className="text-muted-foreground">{today}</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Tasks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-semibold">Today's Tasks</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-3">
                {todayTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <input 
                      type="checkbox" 
                      checked={task.done}
                      className="h-5 w-5 rounded border-primary"
                      readOnly
                    />
                    <div className="flex-1">
                      <p className={task.done ? "line-through text-muted-foreground" : ""}>
                        {task.title}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Today's Habits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-semibold">Today's Habits</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {habits.map((habit) => (
                  <div key={habit.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={habit.done}
                          className="h-5 w-5 rounded border-primary"
                          readOnly
                        />
                        <span className={habit.done ? "text-muted-foreground line-through" : ""}>
                          {habit.name}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        🔥 {habit.streak} days
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Goals Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-semibold">Active Goals</h2>
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Complete 100 tasks</span>
                    <span className="text-sm text-muted-foreground">67/100</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">30-day meditation streak</span>
                    <span className="text-sm text-muted-foreground">12/30</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Level & XP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-6 gradient-primary text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">Your Level</p>
                  <h3 className="text-3xl font-bold">Level 8</h3>
                </div>
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Zap className="h-8 w-8" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>XP Progress</span>
                  <span>1,240 / 2,000</span>
                </div>
                <Progress value={62} className="h-3 bg-white/20" />
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm opacity-90">Latest Badge</p>
                <p className="font-semibold">🌅 Early Riser</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
