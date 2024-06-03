import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Box } from "@mui/material"
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function LastNavbar (){

     const [open, setOpen] = useState(false);


     const toggleDrawer = (newOpen) => () => {
          setOpen(newOpen);
        };

     function handleSettings(){


     }




     return(

        <Box className="bg-slate-300 flex justify-end" component="section" sx={{ p: 2, border: '1px dashed grey' }}>


             <Paper sx={{width:130 , height:30 , textAlign: 'center', display:'flex' , justifyContent: 'center', alignItems:'center' , gap:1 , }}  elevation={24} >
                <ArrowLeftIcon className="hover:cursor-pointer"></ArrowLeftIcon>
               <Button onClick={toggleDrawer(true)}  >Settings</Button>

               <Drawer open={open} onClose={toggleDrawer(false)} anchor={'right'}sx={{
                '& .MuiDrawer-paper': {
                    width: '300px', // Custom width
                    background: '#eaeaea]', // Custom background color
                    color: '#000', 
                    borderRadius: '0px 0px 0px 0px ',// Custom text color
                },
            }}>
        
      </Drawer>  



             </Paper>

      </Box>
     )



}

export default LastNavbar