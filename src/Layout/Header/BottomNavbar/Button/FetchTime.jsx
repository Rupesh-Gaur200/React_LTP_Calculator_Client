
import { UserContext } from "../../../../Context/Context"
import { useContext } from "react"
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
function FetchTime(){

     const FetchTime =useContext(UserContext)

    return(
           
        <div className="flex  items-center gap-1">
            <AccessTimeFilledIcon fontSize="small"></AccessTimeFilledIcon>
            <h1>{FetchTime.fetchTime}</h1>
        </div>

    )
}
export default FetchTime