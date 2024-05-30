import { Children } from "react";
import MainLayout from "../Layout/MainLayout";
import DashBoard from "../Pages/Home/DashBoard";


const MainRoutes ={
    path:"/home",
    element:<MainLayout></MainLayout>,
    Children:[
   
        {
            path:"/home",
            element:<DashBoard></DashBoard>
        }




    ]
}

export default MainRoutes