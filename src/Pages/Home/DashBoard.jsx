import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { UserContext } from "../../Context/Context"
import { useContext, useState , useEffect} from "react";

function DashBoard(){

  const [optionChainData , setOptionChainData] = useState([])


  const[columnName , setColumn] = useState([])

  const userState = useContext(UserContext)
  const symbol=userState.userSymbol
  
  const lot =userState.lot
  const expiry =userState.expiry




  const OptionChainData = async  () => {

    
    
      // symbol.toString().toUpperCase()
      // const expiryy=currentMonthDates[1] || null
     
      
     

      // const url = `/api/optionChain/fetch-data?symbol=${symbol}&expiry=${expiry}&lotSize=${lot}`
      // console.log(url)
      
      const response = await axios.get(`/api/optionChain/fetch-data?symbol=${symbol}&expiry=${expiry}&lotSize=${lot}`);
      console.log(response.data.optionChainData)

      setOptionChainData(response.data.OptionChain)
      DataTable(optionChainData)

      // You can also update some state with the fetched data if needed
    
    // const response = await axios.get(`/api/optionChain/fetch-data?symbol=${symbol}&expiry=${expiry}&lotSize=${lot}`);
    //  console.log(response.data);
  };
 
      
 
  function DataTable(){
    // Extracting column names from the first object in the data array
    const columns = optionChainData.length > 0 ? Object.keys(optionChainData[0]) : [];
     setColumn(columns)
  }

useEffect(() => {

    const interval = setInterval(OptionChainData, 3000);
  
    return () => clearInterval(interval);
 
   });



  const newHeaderTitles = [
    'I.V.','T.V.','Vega', 'Theta', 'Gamma', 'Delta',  'IV'  , 'OI Chg', 'OI ', 'Volume ', 'Chg (Pts)', 'LTP' ,  'REVERSAL', 
    'STRIKE', 'REVERSAL',
     'LTP','Chg (Pts)', 'VOLUME ', 'OI ',  'OI Chg', 'IV'  , 'Delta', 'Gamma', 'Theta', 'Vega','T.V.','I.V.'
    ];


      
      
      
    return(
         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
           <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {newHeaderTitles.map((columnName , index) => (
              <TableCell key={index}>{columnName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {optionChainData.map((row, index) => (
            <TableRow key={index}>
              {columnName.map((columnName) => (
                <TableCell key={columnName}>{row[columnName]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  

        
      </Paper>
        
    )
}

export default DashBoard