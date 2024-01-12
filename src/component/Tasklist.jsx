// TaskList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask } from "../Redux/Reducer/TaskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [showButtons, setShowButtons] = useState(false);

  // Load tasks from Local Storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    dispatch({ type: "tasks/addTask", payload: storedTasks });
    setShowButtons(storedTasks.length > 0);
  }, []);

  // Save tasks to Local Storage whenever tasks are updated
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setShowButtons(tasks.length > 0);
  }, [tasks]);

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: prompt("Enter task title"),
      description: prompt("Enter task description"),
    };

    if (newTask.title && newTask.description) {
      dispatch(addTask(newTask));
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEditTask = (task) => {
    const updatedTask = {
      ...task,
      title: prompt("Enter new title", task.title),
      description: prompt("Enter new description", task.description),
    };

    if (updatedTask.title && updatedTask.description) {
      dispatch(editTask(updatedTask));
    }
  };

  return (
    <div className="py-8">
      <div className="text-center">
        <button
          onClick={handleAddTask}
          className="bg-amber-600 text-white px-5 py-2 rounded-lg"
        >
          Add Task
        </button>
      </div>
      {showButtons && (
        <ul>
          {tasks &&
            tasks.map((task) => (
              <>
                <li className="border mx-5 p-5 mt-5" key={task.id}>
                  <strong>Title: {task.title}</strong> - Description:
                  {task.description}
                  <button
                    className="text-white px-8 py-2 ms-5 mr-3 rounded-full bg-rose-600"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-white px-8 py-2 rounded-full bg-green-600"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </li>
              </>
            ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
