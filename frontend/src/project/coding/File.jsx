import React, { useState, useEffect } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { FaFileCirclePlus } from "react-icons/fa6";
import Cookies from "js-cookie";
import Tree from "./Tree.jsx";

export const File = ({ hide, openFile }) => {
  const [currentTask] = useState(() =>
    JSON.parse(Cookies.get("currentTask"))
  );

  const projectId = currentTask.project; // <-- Project ID
// console.log("vvb",projectId)
  const [tree, setTree] = useState(null);

  // ---------------- Load Tree From Backend ----------------
  useEffect(() => {
    const loadTree = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/project/${projectId}`
        );
        const data = await res.json();
        setTree(data);
      } catch (err) {
        console.error("Error loading tree:", err);
      }
    };

    loadTree();
  }, [projectId]);

  // ---------------- Save Tree To Backend ----------------
  const saveTree = async (updatedTree) => {
    setTree(updatedTree);

    await fetch("http://localhost:5000/api/project/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        tree: updatedTree,
      }),
    });
  };

  if (!tree)
    return (
      <div className="text-white p-4">
        Loading project structure...
      </div>
    );

  // ---------------- Add Folder ----------------
 const addFolder = () => {
  const name = prompt("Folder name:");
  if (!name) return;

  const newTree = {
    ...tree,
    children: [
      ...(tree.children || []),
      {
        id: crypto.randomUUID(),
        type: "folder",
        name,
        children: [],
      },
    ],
  };

  saveTree(newTree);
};


  // ---------------- Add File ----------------
  const addFile = () => {
    const name = prompt("File name:");
    if (!name) return;

    const newTree = {
      ...tree,
      children: [
        ...tree.children,
        {
          id: crypto.randomUUID(),
          type: "file",
          name,
          content: "",
        },
      ],
    };

    saveTree(newTree);
  };

  return (
    <div
      className={`${
        hide ? "hidden" : ""
      } absolute top-[4.1rem] z-10 bg-gray-700 h-[91%] w-[20%] border`}
    >
      {/* Top Bar */}
      <div className="bg-gray-800 h-[3.5rem] border flex justify-evenly items-center text-white">
        <p className="w-[60%] h-[3rem] flex justify-center items-center overflow-x-scroll scrollbar-none">
          {currentTask.project}@{currentTask.taskTitle}
        </p>

        <button className="text-xl" onClick={addFolder}>
          <MdCreateNewFolder />
        </button>

        <button className="text-xl" onClick={addFile}>
          <FaFileCirclePlus />
        </button>
      </div>

      {/* Tree Section */}
      <div className="p-2 overflow-y-auto h-full text-white">
        <Tree node={tree} openFile={openFile} saveTree={saveTree} />
      </div>
    </div>
  );
};
