import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import DrawerContent from '../BottomNavbar/Button/DrawerContent';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function MiddleNavbar (){
    
    const CustomIcon = styled(SettingsOutlinedIcon)(({ theme }) => ({
        color: '#cbd5e1',
      
      
      }));

      const [open, setOpen] = useState(false);

      const navigate = useNavigate()
      function handleLogout(e) {
        navigate("/")
      }

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

    return(

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
     <Drawer  open={open} anchor={'right'}    sx={{
                '& .MuiDrawer-paper': {
                    width: '300px', 
                    background: '#eaeaea]', 
                    color: '#000', 
                    borderRadius: '0px 0px 0px 0px ',
                   
                },
            }}>
               <Button onClick={handleClickDrawer} component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <ChevronLeftIcon></ChevronLeftIcon>
        Click to close the Drawer
              </Button >


                <DrawerContent></DrawerContent>
        
      </Drawer>  

        </div>

      </div>
    )
}

export default MiddleNavbar