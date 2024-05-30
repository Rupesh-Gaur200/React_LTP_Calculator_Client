
import Avatar from '@mui/material/Avatar';

function Header (){
           
    return(
        <div>
        <div className="w-full h-5 bg-slate-600 flex py-3 px-10  items-center">
            <div className="flex items-center">
            <h1 className="text-[#fff]">Welcome Back </h1>
            <strong className="text-[#fff] mx-2"> Rupesh Gaur</strong>
            </div>
            <h1 className="text-[#fff]">! Your Subscription will be Expire on </h1>
            <strong className="mx-2 text-[#fff]">2024-10-12</strong>
            
        </div>
        
        <div className="w-screen bg-[#212529] h-20 px-20 flex justify-between items-center ">

          <div className="h-full">
         <img src="https://alpha.ltpcalculator.com/theme/images/logoltp.png" className=" h-full"></img>
         </div>

         <div className='flex gap-14'>
              <Avatar alt="Remy Sharp" src="https://media.licdn.com/dms/image/D4D03AQG70Kdxbvq8dA/profile-displayphoto-shrink_800_800/0/1689831785402?e=1722470400&v=beta&t=JBCU2QbNbivxPtml1WDK4x5xarDYsKlb2UlWGw9J4pk" />
              <div className='flex justify-center items-center px-4  '>
              <button className='text-slate-200'>Logout</button>
              </div>
         </div>

        </div>





        </div>
    )

}

export default Header 