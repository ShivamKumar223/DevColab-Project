import express from "express";
import http from "http";
import {Server } from "socket.io";
import cors from "cors";
import { Socket } from "dgram";

const app = express();
const server = http.createServer( app );
const io = new Server( server, {
               cors : {
                 origin: "http://localhost:5173",
                 methods : ["GET", "POST"],
                 credentials: true
               }
          });

   const codeMap = new Map();

   io.on("connection",(socket)=>{  

      socket.on("setID", (id)=>{
           socket.codeID = id;
           codeMap.set(id, socket.id);
           console.log("emp : ", socket.codeID, "is connected");
      })

     socket.on("shareCode", ((data)=>{
       console.log(data.selectedCandidates)
         for(let Dev of data.selectedCandidates)
         {
            const targetDev = codeMap.get(Dev)
            if(targetDev)
            {
                socket.to(targetDev).emit("shareCode", data);
            }
         }
     }))
      
   })

server.listen(5001, ()=>console.log("Server listen on port 5001 for handle code sharing"))