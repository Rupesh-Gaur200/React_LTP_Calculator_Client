
import { UserContext } from "../../../../Context/Context"
import { useContext } from "react"

import * as React from 'react';
import Box from '@mui/material/Box';



function Price_S (){
    const price_S=useContext(UserContext)

    return(
        <div disabled className='bg-blue-600 px-2 py-[3px] rounded-[3px]  w-[150px] text-sm text-center text-slate-300 cursor-pointer'> 
                    <option  value={price_S.fetchPrice}>{price_S.fetchPrice==null?"No Data":price_S.fetchPrice}</option>  
      </div>
    )
}
export default Price_S