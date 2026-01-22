import { useEffect, useState } from "react";

import { MdDeleteForever } from "react-icons/md";
import { TiInputChecked } from "react-icons/ti";

// import {Navbar} from "../common/navbar.jsx";
import {User} from "../user.jsx";
import {LeftMenu} from "../leftMenu.jsx";




export const TodoList = ()=>{
   
    return (
        <>  
           {/* <Navbar/> */}
           <LeftMenu/>
           <User/>
           <Todo/>
        </>
    )
}

export const Todo = ()=>{
    const [allTask, setAllTask] = useState(()=>{
        const myTask = localStorage.getItem("myTask")
         return   JSON.parse(myTask) || []
    });
    const [task, setTask] = useState({Task:"", checked:false});
    const [show, setShow] = useState("all")
    

    const handleInput = (e)=>{
 
        setTask({...task, Task:e.target.value});
    }

    const addTask = (e) =>{
      e.preventDefault();
       let arr=[];
        allTask.map((task)=>{
           arr.push(task.Task);
        })

         if(task.Task.trim() == "")
         {
            alert("please enter a valid task")
           
         }
         else if(arr.includes(task.Task))
         {
            alert("This task is already exist")
            
         }
         else{
            setAllTask([...allTask, {Task:task.Task, checked:false}]);
           

         }


         setTask({Task:"", checked:false})
    }

    const handleCheck = (task)=>{

    let temp = allTask?.map((currTask)=>{
        
            if(currTask.Task == task.Task)
            {
             return {...currTask, checked: !currTask.checked}
                }
            else
                return currTask;
        })

        setAllTask(temp)
        
    }

   const  handleDeleteTask=(index)=>{
         let tempArray = allTask;
         tempArray.splice(index,1);
         setAllTask([...tempArray]);
         
    }

   useEffect(()=>{
       
          localStorage.setItem("myTask",JSON.stringify(allTask));
    },[allTask])

      
    return (
     
       <div className="h-screen w-[80%] bg-gray-700 absolute right-0 rounded-[1px] ">

        <h1 className="text-center text-[2.5rem] underline">To-do</h1>
        <div className="flex p-5">
            <form onSubmit={(e)=>addTask(e)} className="bg-gray-600 h-[3.5rem] w-[50%] border-blue-500 border-[2px] rounded-[10px]
                        flex justify-between items-center px-2">
               <input onChange={(e)=>handleInput(e)} value={task.Task} className="w-[80%] h-[80%] bg-transparent px-5" type="text" placeholder="Add a new task..." />
               <button type="submit" className="w-[15%] h-[80%] bg-blue-500 rounded-[10px] active:text-[0.9rem] hover:bg-blue-400 ">+ Add</button>
            </form>
            <div className="flex justify-evenly w-[50%] ">
                <button onClick={()=>setShow("all")}        className={`${show=="all"?"bg-gray-600":"bg-gray-700"} w-[25%] border-blue-500 border-[1px] rounded-[10px] hover:bg-gray-600`}>All</button>
                <button onClick={()=>setShow("pending")}    className={`${show=="pending"?"bg-gray-600":"bg-gray-700"} w-[25%] border-blue-500 border-[1px] rounded-[10px] hover:bg-gray-600`}>Pending</button>
                <button onClick={()=>setShow("completed")}  className={`${show=="completed"?"bg-gray-600":"bg-gray-700"} w-[25%] border-blue-500 border-[1px] rounded-[10px] hover:bg-gray-600`}>Completed</button>
            </div>
        </div>    

        <ul className="bg-gray-600 border-[2px] border-blue-500 h-[77%] mx-5 p-3 rounded-[1rem] overflow-y-scroll scrollbar-none">
{
    
    allTask.map((task,ind)=>{
        if(show=="all")
           return  <li key={ind} className="bg-gray-700 border-[1px] border-blue-500 min-h-[4rem] m-2 rounded-[1rem] flex items-center px-5 py-2 flex justify-between">
               <p className={`${task.checked?"line-through":""} w-[80%] min-h-[1rem] break-words`}> {task.Task}</p>
               <button className="text-[1.3rem] hover:text-red-500 h-[2rem] w-[2rem]" onClick={()=>handleDeleteTask(ind)} ><MdDeleteForever /></button>
               <button onClick={()=>handleCheck(task)} className={`text-[1.5rem]  h-[2rem] w-[2rem] ${task.checked?"text-green-400":"text-white"} active:text-[1.7rem]`}><TiInputChecked /></button>
            </li>
            })
        
}
{
 allTask.map((task)=>{
        if(show=="pending" && task.checked==false)
           return  <li className="bg-gray-700 border-[1px] border-blue-500 min-h-[4rem] m-2 rounded-[1rem] flex items-center px-5 py-2 flex justify-between">
               <p className={`w-[80%] min-h-[1rem] break-words`}> {task.Task}</p>
               <button className="text-[1.3rem] hover:text-red-500 h-[2rem] w-[2rem]" ><MdDeleteForever /></button>
               <button onClick={()=>handleCheck(task)} className={`text-[1.5rem]  h-[2rem] w-[2rem] ${task.checked?"text-green-400":"text-white"} active:text-[1.7rem]`}><TiInputChecked /></button>
            </li>
            })
}
{
     allTask.map((task)=>{
        if(show=="completed" && task.checked==true)
           return  <li className="bg-gray-700 border-[1px] border-blue-500 min-h-[4rem] m-2 rounded-[1rem] flex items-center px-5 py-2 flex justify-between">
               <p className={`w-[80%] min-h-[1rem] break-words`}> {task.Task}</p>
               <button className="text-[1.3rem] hover:text-red-500 h-[2rem] w-[2rem]" ><MdDeleteForever /></button>
               <button onClick={()=>handleCheck(task)} className={`text-[1.5rem]  h-[2rem] w-[2rem] ${task.checked?"text-green-400":"text-white"} active:text-[1.7rem]`}><TiInputChecked /></button>
            </li>
            })
}
        </ul>
          
       </div>
    )
}