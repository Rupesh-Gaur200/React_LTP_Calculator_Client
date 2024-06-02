import { useEffect } from "react"


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

    useEffect(()=>{

    },[expiryDate])

    // console.log(currentMonthDates)
    // console.log(currentMonth+1)
    return(
     
        <select className='bg-slate-900 px-2 py-[2px] rounded-md  text-slate-300 mx-3 cursor-pointer'> 
              
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