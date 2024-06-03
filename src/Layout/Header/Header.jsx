
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from "../../Context/Context"
import { useContext, useState } from "react";
import DashBoard from '../../Pages/Home/DashBoard';
import BottomNavbar from './BottomNavbar/BottomNavbar';
import LastNavbar from './LastNavbar/LastNavbar';

function Header() {

  const navigate = useNavigate()
  function handleLogout(e) {
    navigate("/")
  }

  const userState = useContext(UserContext)
  console.log(userState.user)




  return (
    <div className='w-full h-full'>

      {/* Upper nav-bar Start Here */}
      <div className="w-full h-5 bg-slate-600 flex py-4 px-10  items-center">
        <div className="flex items-center">
          <h1 className="text-[#fff] text-sm">Welcome Back </h1>
          <strong className="text-[#fff] mx-2">{userState.user?.user.username}</strong>
        </div>
        <h1 className="text-[#fff] text-sm">! Your Subscription will be Expire on </h1>
        <strong className="mx-2 text-[#fff]">{userState.user?.userSubscription.subscriptionEndDate.replace("T18:30:00.000+00:00", "")}</strong>

      </div>

      {/* Upper Navbar ends here */}

      {/* Middle Navbar Start here */}

      <div className="w-full bg-[#212529] h-20 px-20 flex justify-between items-center ">

        <div className="h-full">
          <img src="https://alpha.ltpcalculator.com/theme/images/logoltp.png" className=" h-full"></img>
        </div>

        <div className='flex gap-14'>

          <Tooltip title="UserProfile " arrow="down">
            <Avatar className="hover:cursor-pointer" alt="Remy Sharp" src="https://media.licdn.com/dms/image/D4D03AQG70Kdxbvq8dA/profile-displayphoto-shrink_800_800/0/1689831785402?e=1722470400&v=beta&t=JBCU2QbNbivxPtml1WDK4x5xarDYsKlb2UlWGw9J4pk" />
          </Tooltip>

          <div className='flex justify-center items-center px-4  '>
            <button onClick={handleLogout} className='text-slate-200'>
              Logout  <LogoutIcon className='scale-x-[-1]' /> </button>
          </div>
        </div>

      </div>

      {/* Middle Navbar Ends Here */}

      <BottomNavbar></BottomNavbar>

      <LastNavbar></LastNavbar>

      <DashBoard></DashBoard>
    </div>

  )

}

export default Header 