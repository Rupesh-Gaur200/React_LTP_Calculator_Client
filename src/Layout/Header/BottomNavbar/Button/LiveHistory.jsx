
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function LiveHistory(){



    return (



        <div className=' flex flex-col h-full items-center '>

            {/* <div className='border-2 border-red-950 h-full'></div> */}

             <form className='w-full h-full flex items-center'>
              <input className='mx-1' type='radio' value="Live" ></input> 
              <label>Live</label>   
              <input  className='mx-3' type='radio' value="History" ></input>   
              <label>History</label>  
         
            </form>
        </div>

    
    //     <FormControl  >
    //   <RadioGroup
    
    //     defaultValue="Live"
    //     name="radio-buttons-group"
      
    //   >
    //     <FormControlLabel   value="Live" control={<Radio />} label="Live" />
    //     <FormControlLabel value="History" control={<Radio />} label="History" />
    //   </RadioGroup>
    // </FormControl>

  
    )
}

export default LiveHistory