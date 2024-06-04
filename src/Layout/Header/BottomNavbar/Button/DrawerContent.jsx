
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useState } from 'react';

function DrawerContent({toggleDrawer}){
      
    const [open , setOpen] =useState(false)

     

    return (
       
        <Button  component="section" sx={{ p: 2, border: '1px dashed grey' }}>
 
        This Box renders as an HTML section element.
      </Button >

    )
}

export default DrawerContent