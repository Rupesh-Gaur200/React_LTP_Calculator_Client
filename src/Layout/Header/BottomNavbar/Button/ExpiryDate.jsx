import { useContext, useEffect } from "react"


import { UserContext } from "../../../../Context/Context" 

function ExpiryDate({expiryDate}){


    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()+1; // Months are zero-indexed in JavaScript Date (0 = January, 11 = December)
    const currentYear = currentDate.getFullYear();
    

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('-').map(Number);
        return { day, month, year };
      };

      
    const currentMonthDates = expiryDate?.filter(dateString => {
        const { month, year } = parseDate(dateString);
        return month === currentMonth && year === currentYear;
      });

      const userState = useContext(UserContext)
      userState.setExpiry(currentMonthDates[currentMonthDates.length-1])
    useEffect(()=>{

    },[expiryDate])

    // console.log(currentMonthDates)
    // console.log(currentMonth+1)
    return(
     
        <select className='bg-slate-900 px-2 py-[3px] rounded-[3px]  font-bold text-center text-slate-300 cursor-pointer'> 
              
        {currentMonthDates?.map((item , index)=>{


               return(
                    <option key={index} value={item}>{item}</option>

                 )

        })
          
          
        }
       
        
        
      </select>

    )
}

export default ExpiryDate