import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface PomodoroSession {
  id: string;
  date: string;
  duration: number;
  type: "work" | "break";
}

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState<PomodoroSession[]>([
    { id: "1", date: "2025-11-29", duration: 25, type: "work" },
    { id: "2", date: "2025-11-29", duration: 5, type: "break" },
    { id: "3", date: "2025-11-28", duration: 25, type: "work" },
  ]);

  const workDuration = 25 * 60;
  const breakDuration = 5 * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Session completed
      setIsActive(false);
      const newSession: PomodoroSession = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        duration: isBreak ? 5 : 25,
        type: isBreak ? "break" : "work",
      };
      setSessions([newSession, ...sessions]);
      
      // Auto-switch to break or work
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? workDuration : breakDuration);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak, sessions]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? breakDuration : workDuration);
  };

  const switchMode = () => {
    setIsActive(false);
    setIsBreak(!isBreak);
    setTimeLeft(isBreak ? workDuration : breakDuration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const totalDuration = isBreak ? breakDuration : workDuration;
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

  const todaySessions = sessions.filter(
    (s) => s.date === new Date().toISOString().split('T')[0]
  );
  const totalFocusTime = todaySessions
    .filter((s) => s.type === "work")
    .reduce((acc, s) => acc + s.duration, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-heading font-bold text-gradient mb-2">
            Pomodoro Timer
          </h1>
          <p className="text-muted-foreground">Stay focused with the Pomodoro Technique</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2"
          >
            <Card className={`p-8 ${isBreak ? "gradient-secondary" : "gradient-primary"} text-white`}>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {isBreak ? (
                    <Coffee className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                  <h2 className="text-2xl font-heading font-semibold">
                    {isBreak ? "Break Time" : "Focus Time"}
                  </h2>
                </div>

                <div className="my-12">
                  <p className="text-8xl font-bold font-heading mb-6">
                    {formatTime(timeLeft)}
                  </p>
                  <Progress 
                    value={progress} 
                    className="h-3 bg-white/20"
                  />
                </div>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={toggleTimer}
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    {isActive ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={resetTimer}
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                  <Button
                    onClick={switchMode}
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Coffee className="h-5 w-5 mr-2" />
                    {isBreak ? "Work" : "Break"}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <Card className="p-6">
              <h3 className="font-heading font-semibold mb-4">Today's Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Focus Time</p>
                  <p className="text-3xl font-bold text-primary">
                    {(totalFocusTime / 60).toFixed(1)}h
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sessions Completed</p>
                  <p className="text-3xl font-bold">
                    {todaySessions.filter((s) => s.type === "work").length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-heading font-semibold mb-4">Session History</h3>
              <div className="space-y-2">
                {sessions.slice(0, 5).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between text-sm p-2 rounded bg-muted/50"
                  >
                    <span className="flex items-center gap-2">
                      {session.type === "work" ? "🎯" : "☕"}
                      {session.duration} min
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(session.date).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
