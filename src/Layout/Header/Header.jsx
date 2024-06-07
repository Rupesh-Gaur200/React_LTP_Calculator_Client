import DashBoard from '../../Pages/Home/DashBoard';
import BottomNavbar from './BottomNavbar/BottomNavbar';
import UpperNavbar from './UpperNavbar/UpperNavbar';
import LastLowerNavbar from './LastLowerNavbar/LastLowerNavbar';
import MiddleNavbar from './MiddleNavbar/MiddleNavbar';

function Header() {

  return (
    <div className='w-full h-full'>

      {/* Upper nav-bar Start Here */}
        {/* <UpperNavbar></UpperNavbar> */}

      {/* Upper Navbar ends here */}

      {/* Middle Navbar Start here */}
        <MiddleNavbar></MiddleNavbar>

      {/* Middle Navbar Ends Here */}


       {/* BottomNavbar component Start Here,It contains Buttons open BottomNavbar to Views Buttons  */}

        <BottomNavbar></BottomNavbar>

       {/* BottomNavbar component ends Here, It contains Buttons open BottomNavbar to Views Buttons */}


       {/* LastLowerNavbar Component Start Here Contains RF Volume , RF Strike Logics and Component */}

        <LastLowerNavbar></LastLowerNavbar>
       {/* LastLowerNavbar Component Ends Here */}

       {/* DashBoard Start From here */}

      <DashBoard></DashBoard>
      {/* DashBoard Ends Here */}

    </div>

  )

}

export default Header 