import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Bell, User, Palette, Database } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-heading font-bold text-gradient mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">Manage your preferences</p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-heading font-semibold">Profile</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" placeholder="Your name" defaultValue="Muhammad Fadil" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" defaultValue="mf@example.com" />
                </div>
                <Button className="gradient-primary text-white">Save Changes</Button>
              </div>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-accent" />
                <h2 className="text-xl font-heading font-semibold">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Task Reminders</p>
                    <p className="text-sm text-muted-foreground">Get notified about upcoming deadlines</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Habit Reminders</p>
                    <p className="text-sm text-muted-foreground">Daily reminders for your habits</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Achievement Badges</p>
                    <p className="text-sm text-muted-foreground">Celebrate when you earn new badges</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-5 w-5 text-secondary" />
                <h2 className="text-xl font-heading font-semibold">Appearance</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" className="flex-1">Light</Button>
                    <Button variant="outline" className="flex-1">Dark</Button>
                    <Button variant="outline" className="flex-1">Auto</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Animations</p>
                    <p className="text-sm text-muted-foreground">Enable smooth transitions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Database className="h-5 w-5 text-success" />
                <h2 className="text-xl font-heading font-semibold">Data Management</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Export your data or clear all progress
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Export Data</Button>
                    <Button variant="destructive">Clear All Data</Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
