import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Calendar, GripVertical } from "lucide-react";
import { Task } from "@/pages/Tasks";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "bg-destructive/10 text-destructive";
      case "medium":
        return "bg-accent/10 text-accent";
      case "low":
        return "bg-muted text-muted-foreground";
      default:
        return "";
    }
  };

  const getCategoryColor = () => {
    switch (task.category) {
      case "Work":
        return "bg-primary/10 text-primary";
      case "Study":
        return "bg-info/10 text-info";
      case "Health":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-2">
        <div {...attributes} {...listeners}>
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium mb-2">{task.title}</h4>
          
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor()}`}>
              {task.category}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor()}`}>
              {task.priority}
            </span>
          </div>

          {task.deadline && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(task.deadline).toLocaleDateString('id-ID')}
            </div>
          )}

          {task.subtasks && task.subtasks.length > 0 && (
            <div className="mt-2 text-xs text-muted-foreground">
              {task.subtasks.filter((st) => st.done).length}/{task.subtasks.length} subtasks
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
