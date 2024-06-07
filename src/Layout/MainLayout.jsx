import { Outlet } from "react-router-dom";
import Header from "./Header/Header";



function MainLayout(){

      return (
       

        
        <div className="relative  w-full ">
        <Header  />

        <div className="flex fixed">
          <div className="flex-1">
            <div className="w-full h-full overflow-y-auto bg-gray-200">
              <Outlet />
            </div>

          </div>

        </div>

      </div>




      )
      
}

export default MainLayout