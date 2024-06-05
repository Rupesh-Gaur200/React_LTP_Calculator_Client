
import { UserContext } from "../../../Context/Context"
import { useContext, useState } from "react";

function UpperNavbar (){

    const userState = useContext(UserContext)

    return(
        <div className="w-full h-5 bg-slate-600 flex py-3 px-10  items-center">
        <div className="flex items-center">
          <h1 className="text-[#fff] text-sm">Welcome Back </h1>
          <strong className="text-[#fff] mx-2">{userState.user?.user.username}</strong>
        </div>
        <h1 className="text-[#fff] text-sm">! Your Subscription will be Expire on </h1>
        <strong className="mx-2 text-[#fff]">{userState.user?.userSubscription.subscriptionEndDate.replace("T18:30:00.000+00:00", "")}</strong>

      </div>
    )
}
export default UpperNavbar