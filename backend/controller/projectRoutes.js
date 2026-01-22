import express from "express";
import Project from "../model/fileCode.js";

const router = express.Router();

// -------------------------------------------------------
// Create new project
// -------------------------------------------------------
router.post("/update", async (req, res) => {
  const { projectId } = req.body;

  try {
    const newProject = await Project.create({ projectId });
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------------------------------------
// Get project file tree
// -------------------------------------------------------
router.get("/:projectId", async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });

    if (!project) return res.status(404).json({ msg: "Project not found" });

    res.json(project.tree);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------
// Update file tree (save)
// -------------------------------------------------------
router.post("/update", async (req, res) => {
  const { projectId, tree } = req.body;

  try {
    const updated = await Project.findOneAndUpdate(
      { projectId },
      { tree },
      { new: true }
    );

    res.json(updated.tree);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
