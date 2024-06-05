
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
function LiveHistory(){

    return (

        <div className=' flex flex-col h-full items-center '>

            {/* <div className='border-2 border-red-950 h-full'></div> */}

             <form className='w-full h-full flex items-center'>
             <Switch color='warning'  defaultChecked />  
             
            
         
            </form>
        </div>
    )
}

export default LiveHistory