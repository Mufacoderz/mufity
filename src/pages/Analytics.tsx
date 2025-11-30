import { Card } from "@/components/ui/card";
import { TrendingUp, Award, Clock, Target } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const productivityData = [
    { day: "Mon", tasks: 8, hours: 4 },
    { day: "Tue", tasks: 6, hours: 3 },
    { day: "Wed", tasks: 10, hours: 5 },
    { day: "Thu", tasks: 7, hours: 3.5 },
    { day: "Fri", tasks: 9, hours: 4.5 },
    { day: "Sat", tasks: 5, hours: 2 },
    { day: "Sun", tasks: 4, hours: 2 },
  ];

  const moodData = [
    { day: "Mon", mood: 4, tasks: 8 },
    { day: "Tue", mood: 3, tasks: 6 },
    { day: "Wed", mood: 5, tasks: 10 },
    { day: "Thu", mood: 3, tasks: 7 },
    { day: "Fri", mood: 4, tasks: 9 },
    { day: "Sat", mood: 4, tasks: 5 },
    { day: "Sun", mood: 3, tasks: 4 },
  ];

  const stats = [
    { label: "Most Productive Hour", value: "9-11 AM", icon: Clock, color: "text-primary" },
    { label: "Best Habit Streak", value: "Exercise (12d)", icon: Award, color: "text-accent" },
    { label: "Avg Tasks/Day", value: "7.0", icon: Target, color: "text-success" },
    { label: "Weekly Growth", value: "+15%", icon: TrendingUp, color: "text-info" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-heading font-bold text-gradient mb-2">
            Analytics & Insights
          </h1>
          <p className="text-muted-foreground">Track your productivity trends</p>
        </motion.div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Productivity Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-heading font-semibold mb-4">
                Weekly Productivity
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Focus Hours Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-heading font-semibold mb-4">
                Focus Hours Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--accent))", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Mood vs Tasks Correlation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h2 className="text-xl font-heading font-semibold mb-4">
                Mood vs Tasks Completed
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="mood" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={3}
                    name="Mood (1-5)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="tasks" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Tasks"
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Higher mood correlates with more completed tasks
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
