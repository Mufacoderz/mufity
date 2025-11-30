import { useState } from "react";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import KanbanColumn from "@/components/KanbanColumn";
import TaskCard from "@/components/TaskCard";

export interface Task {
  id: string;
  title: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "inProgress" | "done";
  deadline?: string;
  subtasks?: { id: string; title: string; done: boolean }[];
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design new landing page",
      category: "Work",
      priority: "high",
      status: "todo",
      deadline: "2025-12-05",
      subtasks: [
        { id: "1-1", title: "Create wireframe", done: true },
        { id: "1-2", title: "Design mockup", done: false },
      ],
    },
    {
      id: "2",
      title: "Weekly team meeting",
      category: "Work",
      priority: "medium",
      status: "todo",
    },
    {
      id: "3",
      title: "Write blog post",
      category: "Study",
      priority: "low",
      status: "inProgress",
      deadline: "2025-12-10",
    },
    {
      id: "4",
      title: "Morning workout",
      category: "Health",
      priority: "high",
      status: "done",
    },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const newStatus = over.id as Task["status"];

    if (activeTask && activeTask.status !== newStatus) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === activeTask.id ? { ...task, status: newStatus } : task
        )
      );
    }
  };

  const columns: { id: Task["status"]; title: string }[] = [
    { id: "todo", title: "To Do" },
    { id: "inProgress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

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
                Task Board
              </h1>
              <p className="text-muted-foreground">Manage your tasks with Kanban</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button className="gradient-primary text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <Input placeholder="Search tasks..." className="max-w-xs" />
          </div>
        </motion.div>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((column, index) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <KanbanColumn
                  id={column.id}
                  title={column.title}
                  tasks={tasks.filter((task) => task.status === column.id)}
                />
              </motion.div>
            ))}
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Tasks;
