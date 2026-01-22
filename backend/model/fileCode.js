import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },

  // file tree (root → folders → files)
  tree: {
    type: Object,
    required: true,
    default: {
      id: "root",
      type: "folder",
      name: "root",
      children: []
    }
  }
});

const FileCode = mongoose.model("FileCode", ProjectSchema);

export default FileCode;
