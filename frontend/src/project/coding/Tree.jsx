import React, { useState } from "react";

const Tree = ({ node, openFile = () => {}, saveTree }) => {
  const [expand, setExpand] = useState(true);

  const handleAddFile = () => {
    const name = prompt("File name:");
    if (!name) return;

    node.children.push({
      id: crypto.randomUUID(),
      type: "file",
      name,
      content: "",
    });

    saveTree({ ...node });
  };

  const handleAddFolder = () => {
    const name = prompt("Folder name:");
    if (!name) return;

    node.children.push({
      id: crypto.randomUUID(),
      type: "folder",
      name,
      children: [],
    });

    saveTree({ ...node });
  };

  return (
    <div className="ml-2 my-1">
      <div
        className="cursor-pointer text-gray-200 hover:text-white flex gap-2 items-center text-sm py-1"
        onClick={() => {
          if (node.type === "folder") setExpand(!expand);
          else openFile(node);
        }}
      >
        <span>{node.type === "folder" ? "📁" : "📄"}</span>
        <span className="truncate">{node.name}</span>
      </div>

      {expand && node.type === "folder" && (
        <div className="ml-4 border-l border-gray-700 pl-2">
          <div className="flex gap-2 my-1">
            <button onClick={handleAddFile} className="text-xs text-green-400 hover:underline">
              + File
            </button>
            <button onClick={handleAddFolder} className="text-xs text-blue-400 hover:underline">
              + Folder
            </button>
          </div>

          {node.children?.map((child) => (
            <Tree
              key={child.id}
              node={child}
              openFile={openFile}
              saveTree={saveTree}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tree;