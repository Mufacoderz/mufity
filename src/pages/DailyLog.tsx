import { useState } from "react";
import { Calendar, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

interface DailyEntry {
  id: string;
  date: string;
  mood: string;
  notes: string;
  tasksCompleted: number;
}

const moods = [
  { emoji: "😄", label: "Great", value: "great" },
  { emoji: "🙂", label: "Good", value: "good" },
  { emoji: "😐", label: "Okay", value: "okay" },
  { emoji: "😔", label: "Bad", value: "bad" },
  { emoji: "😢", label: "Terrible", value: "terrible" },
];

const DailyLog = () => {
  const [selectedMood, setSelectedMood] = useState("good");
  const [notes, setNotes] = useState("");

  const [entries] = useState<DailyEntry[]>([
    {
      id: "1",
      date: "2025-11-28",
      mood: "great",
      notes: "Very productive day! Completed all tasks on time.",
      tasksCompleted: 8,
    },
    {
      id: "2",
      date: "2025-11-27",
      mood: "good",
      notes: "Good progress on the project. Had a great team meeting.",
      tasksCompleted: 6,
    },
    {
      id: "3",
      date: "2025-11-26",
      mood: "okay",
      notes: "Average day, feeling a bit tired.",
      tasksCompleted: 4,
    },
  ]);

  const weeklyStats = {
    avgMood: "Good",
    avgTasks: 6,
    mostProductiveDay: "Monday",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-heading font-bold text-gradient mb-2">
            Daily Log
          </h1>
          <p className="text-muted-foreground">Track your mood and daily activities</p>
        </motion.div>

        {/* Today's Entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-heading font-semibold">Today's Entry</h2>
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>

            {/* Mood Selector */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-3">How are you feeling today?</p>
              <div className="flex gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`
                      flex flex-col items-center gap-1 p-3 rounded-lg transition-all
                      ${selectedMood === mood.value 
                        ? "bg-primary text-primary-foreground scale-110" 
                        : "bg-muted hover:bg-muted/80"
                      }
                    `}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-xs">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Notes</p>
              <Textarea
                placeholder="Write about your day..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>

            <Button className="gradient-primary text-white">
              <Plus className="h-4 w-4 mr-2" />
              Save Entry
            </Button>
          </Card>
        </motion.div>

        {/* Weekly Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-success" />
              <h2 className="text-xl font-heading font-semibold">Weekly Summary</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Average Mood</p>
                <p className="text-2xl font-bold">{weeklyStats.avgMood}</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Avg Tasks/Day</p>
                <p className="text-2xl font-bold">{weeklyStats.avgTasks}</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Most Productive</p>
                <p className="text-2xl font-bold">{weeklyStats.mostProductiveDay}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Previous Entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-heading font-semibold mb-4">Previous Entries</h2>
          <div className="space-y-4">
            {entries.map((entry) => {
              const mood = moods.find((m) => m.value === entry.mood);
              return (
                <Card key={entry.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-center">
                      <span className="text-3xl">{mood?.emoji}</span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(entry.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">
                        {new Date(entry.date).toLocaleDateString('id-ID', { weekday: 'long' })}
                      </p>
                      <p className="mb-2">{entry.notes}</p>
                      <p className="text-xs text-muted-foreground">
                        ✓ {entry.tasksCompleted} tasks completed
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DailyLog;
