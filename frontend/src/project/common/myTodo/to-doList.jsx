import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { TiInputChecked } from "react-icons/ti";
import { User } from "../user.jsx";
import { LeftMenu } from "../leftMenu.jsx";

export const TodoList = () => {
    return (
        <div className="min-h-screen bg-gray-700 text-white relative overflow-x-hidden">
            <div className="flex flex-col md:flex-row">
                <LeftMenu />
                <div className="w-full md:w-[80%] md:ml-[20%] flex flex-col min-h-screen">
                    <Todo />
                    <User />
                </div>
            </div>
        </div>
    )
}

export const Todo = () => {
    const [allTask, setAllTask] = useState(() => {
        try {
            const myTask = localStorage.getItem("myTask");
            return myTask ? JSON.parse(myTask) : [];
        } catch {
            return [];
        }
    });

    const [task, setTask] = useState({ Task: "", checked: false });
    const [show, setShow] = useState("all");

    const handleInput = (e) => {
        setTask({ ...task, Task: e.target.value });
    }

    const addTask = (e) => {
        e.preventDefault();
        if (task.Task.trim() === "") {
            alert("Please enter a valid task.");
            return;
        }
        
        const taskExists = allTask.some((t) => t.Task.trim().toLowerCase() === task.Task.trim().toLowerCase());
        if (taskExists) {
            alert("This task already exists!");
            return;
        }

        setAllTask([...allTask, { Task: task.Task.trim(), checked: false }]);
        setTask({ Task: "", checked: false });
    }

    const handleCheck = (taskItem) => {
        const temp = allTask.map((currTask) => {
            if (currTask.Task === taskItem.Task) {
                return { ...currTask, checked: !currTask.checked };
            }
            return currTask;
        });
        setAllTask(temp);
    }

    const handleDeleteTask = (indexToDelete) => {
        const tempArray = allTask.filter((_, index) => index !== indexToDelete);
        setAllTask([...tempArray]);
    }

    useEffect(() => {
        localStorage.setItem("myTask", JSON.stringify(allTask));
    }, [allTask]);

    // Filter tasks based on current tab selection
    const filteredTasks = allTask.filter((t) => {
        if (show === "pending") return !t.checked;
        if (show === "completed") return t.checked;
        return true;
    });

    return (
        <div className="w-full bg-gray-700 min-h-screen p-4 md:p-6 text-white overflow-auto flex flex-col gap-6 pb-24 md:pb-6">
            <h1 className="text-center text-2xl md:text-4xl font-bold underline decoration-blue-500">To-Do List</h1>
            
            {/* Input & Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
                <form onSubmit={addTask} className="bg-gray-900 h-12 w-full lg:w-[55%] border border-blue-500 rounded-lg flex justify-between items-center px-3 shadow">
                    <input 
                        onChange={handleInput} 
                        value={task.Task} 
                        className="w-[75%] h-full bg-transparent px-2 text-sm text-white focus:outline-none" 
                        type="text" 
                        placeholder="Add a new task..." 
                    />
                    <button type="submit" className="w-[22%] h-9 bg-blue-600 hover:bg-blue-500 rounded-md text-sm font-medium transition-all shadow">
                        + Add
                    </button>
                </form>

                <div className="flex justify-between w-full lg:w-[40%] gap-2">
                    <button onClick={() => setShow("all")} className={`${show === "all" ? "bg-blue-600 border-blue-400" : "bg-gray-700 border-gray-600"} flex-1 h-10 border rounded-lg text-xs md:text-sm font-medium transition-all shadow`}>All</button>
                    <button onClick={() => setShow("pending")} className={`${show === "pending" ? "bg-blue-600 border-blue-400" : "bg-gray-700 border-gray-600"} flex-1 h-10 border rounded-lg text-xs md:text-sm font-medium transition-all shadow`}>Pending</button>
                    <button onClick={() => setShow("completed")} className={`${show === "completed" ? "bg-blue-600 border-blue-400" : "bg-gray-700 border-gray-600"} flex-1 h-10 border rounded-lg text-xs md:text-sm font-medium transition-all shadow`}>Completed</button>
                </div>
            </div>    

            {/* Task List Container */}
            <ul className="bg-gray-800 border border-blue-500/50 flex-1 min-h-[50vh] max-h-[60vh] p-4 rounded-xl overflow-y-auto scrollbar-none flex flex-col gap-3 shadow-xl">
                {filteredTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-400 text-sm">
                        <p>No tasks found in this section.</p>
                    </div>
                ) : (
                    filteredTasks.map((currTask, ind) => {
                        // Find original index in allTask for proper deletion
                        const originalIndex = allTask.findIndex(t => t.Task === currTask.Task);
                        return (
                            <li key={originalIndex} className="bg-gray-900 border border-gray-700 min-h-[4rem] p-3 rounded-lg flex items-center justify-between gap-3 shadow transition-all hover:border-blue-500">
                                <p className={`${currTask.checked ? "line-through text-gray-500" : "text-white"} flex-1 text-sm md:text-base break-words px-2`}>
                                    {currTask.Task}
                                </p>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button 
                                        onClick={() => handleCheck(currTask)} 
                                        className={`text-xl md:text-2xl h-9 w-9 flex items-center justify-center rounded-lg transition-all ${currTask.checked ? "text-green-400 bg-green-950/50" : "text-gray-400 hover:text-white bg-gray-800"}`}
                                        title={currTask.checked ? "Mark as pending" : "Mark as completed"}
                                    >
                                        <TiInputChecked />
                                    </button>
                                    <button 
                                        className="text-lg md:text-xl h-9 w-9 flex items-center justify-center text-gray-400 hover:text-red-400 bg-gray-800 hover:bg-red-950/30 rounded-lg transition-all" 
                                        onClick={() => handleDeleteTask(originalIndex)}
                                        title="Delete task"
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    )
}