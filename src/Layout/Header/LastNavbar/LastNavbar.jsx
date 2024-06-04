import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Box } from "@mui/material"
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import DrawerContent from './DrawerInside/DrawerContent';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
function LastNavbar (){

     const [open, setOpen] = useState(false);


    

     function handleSettings(){


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
      <Box>
        <Box className="bg-slate-300 flex justify-end" component="section" sx={{ p: 2, border: '1px dashed grey' }}>


            
              
              
               <Paper sx={{ textAlign: 'center', display:'flex' , justifyContent: 'center', alignItems:'center' , gap:1 , }}  elevation={24} >
                 
               
                  </Paper>
              
                  <Fab onClick={handleClickDrawer} sx={{ borderRadius: '0px 0px 0px 0px ',}} variant="extended" size="small" color="string">
                  <ArrowLeftIcon  className="hover:cursor-pointer"></ArrowLeftIcon>
        settings
      </Fab>
               </Box>


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



      </Box>

     
     )



}

export default LastNavbar