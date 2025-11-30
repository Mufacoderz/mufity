import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";
import TaskCard from "./TaskCard";
import { Task } from "@/pages/Tasks";

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

const KanbanColumn = ({ id, title, tasks }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  const getColumnColor = () => {
    switch (id) {
      case "todo":
        return "border-t-4 border-t-energy-red";
      case "inProgress":
        return "border-t-4 border-t-energy-yellow";
      case "done":
        return "border-t-4 border-t-success";
      default:
        return "";
    }
  };

  return (
    <Card className={`p-4 ${getColumnColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg">{title}</h3>
        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div ref={setNodeRef} className="space-y-3 min-h-[200px]">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </Card>
  );
};

export default KanbanColumn;
