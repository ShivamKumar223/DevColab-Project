import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./loginPage.jsx";
import { SignupPage } from "./signup.jsx";
import {LandingPage} from "./common/landingPage/landingPage.jsx";
import {DashbordPage} from "./dashbordPage/dashbordPage.jsx";
import {AddNewProject} from "./addNewProject/addNewProject.jsx";
import {ProjectsPage} from "./common/projectsPage/projects.jsx";
import {ProjectDetails} from "./common/projectsPage/projectDetails.jsx";
import { Teams } from "./common/Teams/teams.jsx";
import { Tasks } from "./common/Tasks/tasks.jsx";
import { Messages } from "./common/messages/messages.jsx";
import { Calendar } from "./common/calendar/calendar.jsx";
import { Settings } from "./common/settings/settings.jsx";
import { TodoList } from "./common/myTodo/to-doList.jsx";
import { Categories } from "./categories/categories.jsx";
import { AdminDashboard } from "./admin/AdminDashboard.jsx";
import { CandidateForm } from "./admin/createNewCandidate.jsx";
import { ToDo } from "./dashbordPage/ToDo";
import { InProgress } from "./dashbordPage/inprogress.jsx";
import { Complete } from "./dashbordPage/Complete.jsx";
import { Review } from "./dashbordPage/Review.jsx";
import { CodeEditor } from "./coding/coding.jsx";
import Footer from "./common/Footer.jsx";
import Main from "./Main.jsx";
import { ForgetPassword } from "./common/ForgetPassword.jsx";
import { AdminAllCandidates } from "./admin/AdminAllCandidates.jsx";
import { AdminEmployees } from "./admin/AdminEmployees.jsx";
import { AdminAdmins } from "./admin/AdminAdmins.jsx";
import { AdminMentors } from "./admin/AdminMentors.jsx";

export const DevColab = () =>{

    const router = createBrowserRouter([
      
        {
            path:"/",
            element:<Main />,
            children:
            [
                {
                    path:"/",
                    element:<LandingPage/>,
                },
                {
                path:"/categories",
                element:<Categories/>
                },
                {
                path:"/signup",
                element:<SignupPage/>
                },
                {
                path:'/login',
                element:<LoginPage/>
                },
                {
                    path: '/forgetPassword',
                    element:<ForgetPassword/>
                }
            ]
        },
        {
            path:"/admin/dashboard",
            element:<AdminDashboard />,
            children:[
                {
                    path:"",
                    element:<AdminAllCandidates />
                },
                {
                    path:"admins",
                    element:<AdminAdmins />
                },
                {
                    path:"mentors",
                    element:<AdminMentors />
                },
                {
                    path:"employees",
                    element:<AdminEmployees />
                }
            ]
        },{
            path:"/admin/candidateform",
            element:<CandidateForm/>
        }, 
         {
            path:"dashboard",
            element:<DashbordPage/>
        },
        {
            path:"projectForm",
            element:<AddNewProject/>
        },
        {
            path:"projects",
            element:<ProjectsPage/>
        },
        {
            path:"projectDetails",
            element:<ProjectDetails/>
        },
        {
            path:"teams",
            element:<Teams/>
        },
        {
            path:"tasks",
            element:<Tasks/>
        },
        {
            path:"messages",
            element:<Messages/>
        },
        {
            path:"calendar",
            element:<Calendar/>
        },
        {
            path:"settings",
            element:<Settings/>
        },
        {
            path:"myTodo",
            element:<TodoList/>
        },{
            path:"todo",
            element:<ToDo/>
        },
        {
            path:"inprogress",
            element:<InProgress/>
        },
        {
            path:"review",
            element:<Review/>
        },
        {
            path:"complete",
            element:<Complete/>
        },{
            path:"coding",
            element:<CodeEditor/>
        }
    ])
    return <RouterProvider router={router}/>
}