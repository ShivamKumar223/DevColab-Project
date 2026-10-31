import mongoose from "mongoose";


// Schema creation
const taskSchema = new mongoose.Schema({
    email:{type:String},
    companyCode:{type:String},
    empID:{type:String},
    project : {type:String, required:true},
    taskTitle :{type: String, required:true},
    description : {type: String},
    assignTo : [{type: String}],
    startDate : {type:Date, required:true},
    dueDate : {type:Date, required:true},
    status: { type: String, required: true, default: "pending" }
});

// Model creation
export const Tasks = mongoose.model("task", taskSchema);

// Safe cookie parser helper
const parseCookie = (cookieStr) => {
    try {
        if (!cookieStr) return null;
        return JSON.parse(cookieStr);
    } catch {
        return null;
    }
};

// task addition
export const addTask = async(req, res)=>{
     const userDetails = parseCookie(req.cookies.DevColab);
     if (!userDetails) return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });

     const { project } = req.query;
     const task = req.body;
     
     if(userDetails.role=="user")
     {
        var check = await Tasks.findOne({$and:[
            {email:{$eq:userDetails.email}},
            {project : {$eq:project}},
            {taskTitle:{$eq:task.taskTitle}}
        ]})
         if(check)
             res.json({success:false,message:"This Task's name is all ready exist."})
        else
        {
             await Tasks.insertOne({...task,email:userDetails.email,project});
             res.json({success:true,message:'Task is created'})
        }
     }else{
        
        var check = await Tasks.findOne({$and:[
            {companyCode:{$eq:userDetails.companyCode}},
            {empID:{$eq:userDetails.empID}},
            {project : {$eq:project}},
            {taskTitle:{$eq:task.taskTitle}}
        ]})
        
         if(check)
             res.json({success:false,message:"This Task's name is all ready exist."})
        else
        {
             await Tasks.insertOne({...task,companyCode:userDetails.companyCode, empID:userDetails.empID, project});
             res.json({success:true,message:'Task is created'})
        }
     
     }
    
}

export const getAllTask = async(req, res)=>{
   const userDetails = parseCookie(req.cookies.DevColab);
   if (!userDetails) return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
    
   if(userDetails.role == "user")
      var tasks = await Tasks.find({email:userDetails.email});
    else
        var tasks = await Tasks.find({$and:[
           {companyCode:userDetails.companyCode},
            ]})
if(tasks==null)
{
   res.end();
}else
   res.json(tasks);

}

export const updateTaskStatus = async(req, res)=>{
   const task = parseCookie(req.cookies.currentTask);
   if (!task) return res.status(400).json({ success: false, message: "No current task found." });

   const newStatus = req.body;
   console.log(newStatus);
   const update = await Tasks.findOneAndUpdate({
    companyCode:task.companyCode,
    empID:task.empID,
    taskTitle:task.taskTitle
   },{$set:{status:newStatus.selectedStatus}})
   console.log(update)
    res.cookie("currentTask",JSON.stringify(update))
   res.end();
}