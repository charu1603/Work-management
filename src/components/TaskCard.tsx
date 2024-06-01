import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  moveTask: (id: Id, newColumnId: Id) => void;
}

function TaskCard({ task, deleteTask, updateTask, moveTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const toggleEditMode = () => { setEditMode((prev) => !prev); setMouseIsOver(false); };

  const getNextColumnDetails = (currentColumnId: Id) => {
    if (currentColumnId === "todo") return { nextColumnId: "doing", buttonText: "Start" };
    if (currentColumnId === "doing") return { nextColumnId: "done", buttonText: "Complete" };
    return { nextColumnId: currentColumnId, buttonText: "" };
  };

  const { nextColumnId, buttonText } = getNextColumnDetails(task.columnId);

  const handleMoveTask = () => {
    moveTask(task.id, nextColumnId);
  };
 
  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className=" opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative " />
    );
  }

  if (editMode) {
    return (
      <>
     
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset  cursor-grab relative">
     
        <textarea className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none "  value={task.content}  placeholder="Task content here" onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            toggleEditMode();
          }
        }} onChange={(e) => updateTask(task.id, e.target.value)} />
      
      </div>
      </>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={toggleEditMode} className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset  cursor-grab relative task" onMouseEnter={() => { setMouseIsOver(true); }} onMouseLeave={() => { setMouseIsOver(false); }}>
    <div className="flex flex-col">
    
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}

      </p>
      </div>
      {task.columnId === "done" && task.timestamp && (
        <p className="text-xs text-gray-400 bg-columnBackgroundColor rounded-4 p-2 mr-2">Completed at: {task.timestamp}</p>
      )}
      {mouseIsOver && (
        <>
          <button onClick={() => { deleteTask(task.id); }} className="stroke-white absolute right-4 top-1/2 -translate-y-1/2  p-2 rounded-6 opacity-60 hover:opacity-100 ml-6">
            <TrashIcon />
          </button>
          {buttonText && (
            <button onClick={handleMoveTask} className="stroke-white absolute right-12 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 px-3 mr-2 rounded opacity-60 hover:opacity-100">
              {buttonText}
            </button>)}
        </>
      )}
    </div>
  );
}

export default TaskCard;
