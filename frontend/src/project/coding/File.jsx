import React, { useState, useEffect } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { FaFileCirclePlus } from "react-icons/fa6";
import Cookies from "js-cookie";
import Tree from "./Tree.jsx";

export const File = ({ hide, openFile }) => {
  const [currentTask] = useState(() =>
    JSON.parse(Cookies.get("currentTask"))
  );

  const projectId = currentTask.project;
  const [tree, setTree] = useState(null);

  useEffect(() => {
    const loadTree = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/api/project/${projectId}`);
        const data = await res.json();
        setTree(data);
      } catch (err) {
        console.error("Error loading tree:", err);
      }
    };

    loadTree();
  }, [projectId]);

  const saveTree = async (updatedTree) => {
    setTree(updatedTree);
    const API_URL = import.meta.env.VITE_API_URL;
    await fetch(`${API_URL}/api/project/update`, {
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
    <div className={`${hide ? "hidden" : "block"} absolute top-14 left-0 z-20 bg-gray-800 text-white h-[calc(100vh-3.5rem)] w-full sm:w-64 border-r border-gray-700 shadow-xl`}>
      <div className="bg-gray-900 h-14 p-2 border-b border-gray-700 flex justify-between items-center px-4">
        <p className="truncate text-sm font-medium max-w-[10rem]">
          {currentTask.project}@{currentTask.taskTitle}
        </p>

        <div className="flex gap-2">
          <button className="text-lg hover:text-green-400" onClick={addFolder}>
            <MdCreateNewFolder />
          </button>
          <button className="text-lg hover:text-blue-400" onClick={addFile}>
            <FaFileCirclePlus />
          </button>
        </div>
      </div>

      <div className="p-3 overflow-y-auto h-[calc(100%-3.5rem)] text-sm">
        <Tree node={tree} openFile={openFile} saveTree={saveTree} />
      </div>
    </div>
  );
};