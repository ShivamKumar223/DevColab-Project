import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import projectRoutes from "./controller/projectRoutes.js";
import { createNewUser, verifyUser, welcome, getAllUsers, getAllEmployees, changePassword } from "./model/users.js";
import { addNewProject, getAllProjects, currentProjectDetails } from "./model/projectRelated.js";
import { addTask, getAllTask, updateTaskStatus } from "./model/projectTask.js"
import connectDB from "./config/db.js";


dotenv.config();
connectDB();     //MongoDB atlas connection

const app = express();
const server = http.createServer(app);
// const io = new Server(server,{
//     cors:{
//         origin:"http://localhost:5173",
//         methods : ["GET", "POST"],
//         credentials: true,
//     }
// });
const io = new Server(server,{
    cors:{
        origin:"devcolab.netlify.app",
        methods : ["GET", "POST"],
        credentials: true,
    }
});

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PATCH","PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "devcolab.netlify.app",
    methods: ["GET", "POST", "PATCH","PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json())


     
    // socket.io : to handle messages
    const messageMap = new Map();

    io.on("connection",(socket)=>{
        socket.on("setMessageID",(user)=>{
            // console.log(user)
             socket.messageID = user.empID;
             messageMap.set(user.empID, socket.id);
             console.log(`${socket.messageID} connected.`);
        })
        
         socket.on("message", (data) => {
            // console.log(data);
            const requiredData = {};
            requiredData.senderID = data.ID;
            // console.log("check",data.ID)
            requiredData.senderName=data.name;
            requiredData.targetGroup = data.group.name;
            // console.log("group",data.group.name)
            requiredData.message = data.message;
            requiredData.date = data.date;
            requiredData.time = data.time;
            // console.log(requiredData);
            for(let id of data.group.assignTo)
         { 
            const targetSocketId = messageMap.get(id);
            if (targetSocketId) {
            io.to(targetSocketId).emit("send-message", requiredData);
         }
         }
        });
    })

    // To handle code board
    

    // To parse cookie
app.use(cookieParser());


app.post("/api/signup",(req, res)=>createNewUser(req, res));

app.post("/api/login",(req, res)=>verifyUser(req, res));

app.get("/api/welcome",(req, res)=>welcome(req, res));

app.get("/api/getUsername",(req, res)=>welcome(req, res));

app.get("/admin/getAllUsers",(req, res)=>getAllUsers(req, res));

app.get('/api/getAllEmployees',(req, res)=>getAllEmployees(req, res))

app.post("/api/addNewProject",(req, res)=>addNewProject(req, res));

app.get("/api/getProjects",(req, res)=>getAllProjects(req, res));

app.get("/api/currentProjectDetails",(req, res)=>currentProjectDetails(req, res));

app.post("/api/addTask",(req, res)=>addTask(req, res))

app.get("/api/allTask",(req, res)=>getAllTask(req, res))

app.patch("/api/updateTaskStatus",(req, res)=>updateTaskStatus(req, res))

app.patch("/api/changePassword", (req, res)=>changePassword(req, res));

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log("Server listen on port ",PORT));