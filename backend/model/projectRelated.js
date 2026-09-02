import mongoose from "mongoose";
import { Tasks } from "./projectTask.js"

//Schema creation 
const projectSchema = new mongoose.Schema({
  companyCode: { type: String },
  empID: { type: String },
  email: { type: String, },
  name: { type: String, required: true },
  description: { type: String },
  assignTo: [{ type: String }],
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true }
});

// Model creation
const Projects = mongoose.model("project", projectSchema);

export const addNewProject = async (req, res) => {
  const projectDetails = req.body;
  //  console.log(projectDetails);
  const { companyCode, empID, email, role } = JSON.parse(req.cookies.DevColab);
  //  console.log({ companyCode, empID, email, role });
  const { name } = projectDetails;
  if (role == "user") {
    var project = await Projects.findOne({
      $and: [
        { email: email },
        { name: name }
      ]
    });
    if (project == null) {
      await Projects.insertOne({ ...projectDetails, email });
      res.json({ success: true, message: 'Project created successfully' });
    } else {
      res.json({ success: false, message: `${name} is already exist.` });
    }
  }
  else {
    var project = await Projects.findOne({
      $and: [
        { companyCode: companyCode },
        { empID: empID },
        { name: name }
      ]
    });
    if (project == null) {
      await Projects.insertOne({ ...projectDetails, empID, companyCode });
      res.json({ success: true, message: 'Project created successfully' });
    } else {
      res.json({ success: false, message: `${name} is already exist.` });
    }
  }
}

export const getAllProjects = async (req, res) => {

  const userDetails = JSON.parse(req.cookies.DevColab);
  // console.log(userDetails);
  if (userDetails.role == "user")
    var projects = await Projects.find({ email: userDetails.email });
  else
    var projects = await Projects.find({
      $and: [
        { companyCode: { $eq: userDetails.companyCode } },
        // {empID:{$eq:userDetails.empID}}
      ]
    })
  res.json(projects);
}

// extrect all deatais of current project including task
export const currentProjectDetails = async (req, res) => {
  const { currentProject } = req.query;
  const { role, email, companyCode, empID } = JSON.parse(req.cookies.DevColab);

  if (role == "user") {
    var projectDetails = await Projects.findOne({ $and: [{ email: email }, { name: currentProject?.trim() }] });
    var allTask = await Tasks.find({ email: email?.trim(), project: currentProject?.trim() });

  }
  else {
    var projectDetails = await Projects.findOne({ $and: [{ companyCode: { $eq: companyCode } }, { name: { $eq: currentProject } }] });
    var allTask = await Tasks.find({ $and: [{ companyCode: { $eq: companyCode } }, { project: { $eq: currentProject } }] });
  }// console.log(email)
  // console.log(currentProject);
  // console.log(tasks)
  res.json({ projectDetails, allTask });

}