
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from "../../Context/Context"
import { useContext, useState } from "react";
import DashBoard from '../../Pages/Home/DashBoard';
import BottomNavbar from './BottomNavbar/BottomNavbar';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { styled } from '@mui/material/styles';

import UpperNavbar from './UpperNavbar/UpperNavbar';


const CustomIcon = styled(SettingsOutlinedIcon)(({ theme }) => ({
  color: '#cbd5e1',


}));
function Header() {

  const navigate = useNavigate()
  function handleLogout(e) {
    navigate("/")
  }

  const [open, setOpen] = useState(false);

  function handleClickDrawer(){
    if(open){
       setOpen(false)
       console.log(open)
    
    } 

    else{
       
        setOpen(true)
        console.log(open)
        
    }

}




  return (
    <div className='w-full h-full'>

      {/* Upper nav-bar Start Here */}
        <UpperNavbar></UpperNavbar>

      {/* Upper Navbar ends here */}

      {/* Middle Navbar Start here */}

      <div className="w-full bg-[#212529] h-20 px-20 flex justify-between items-center">

        <div className="h-[75%]">
          <img src="https://alpha.ltpcalculator.com/theme/images/logoltp.png" className=" h-full"></img>
        </div>

        <div className='flex gap-4  items-center'>

          <Tooltip title="UserProfile " arrow="down">
            <Avatar className="hover:cursor-pointer" alt="Remy Sharp" src="https://media.licdn.com/dms/image/D4D03AQG70Kdxbvq8dA/profile-displayphoto-shrink_800_800/0/1689831785402?e=1722470400&v=beta&t=JBCU2QbNbivxPtml1WDK4x5xarDYsKlb2UlWGw9J4pk" />
          </Tooltip>

          <div className='flex justify-center items-center px-4  '>
            <button onClick={handleLogout} className='text-slate-200'>
              Logout  <LogoutIcon className='scale-x-[-1]' /> </button>
          </div>

         
     <CustomIcon onClick={handleClickDrawer} className='hover:cursor-pointer'><SettingsOutlinedIcon ></SettingsOutlinedIcon></CustomIcon>
        </div>

      </div>

      {/* Middle Navbar Ends Here */}

      <BottomNavbar></BottomNavbar>



      <DashBoard></DashBoard>
    </div>

  )

}

export default Header 