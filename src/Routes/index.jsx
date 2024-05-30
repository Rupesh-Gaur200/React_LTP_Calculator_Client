

import { useRoutes } from "react-router-dom";

import LoginRoutes from "./LoginRoutes";
import MainRoutes from"./MainRoutes";

function AllRoutes(){
    return useRoutes([LoginRoutes , MainRoutes]);

}

export default AllRoutes