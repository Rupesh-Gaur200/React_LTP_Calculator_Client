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
import { useContext, useState , useEffect ,useCallback} from "react";

function DashBoard() {
  const [optionChainData, setOptionChainData] = useState([]);
  const [selectedPrice , setSelectedPrice]= useState("")

  const userState = useContext(UserContext);
  const symbol = userState.userSymbol;
  const lot = userState.lot;
  const expiry = userState.expiry;

  const fetchOptionChainData = useCallback(async () => {
    const url = `/api/optionChain/fetch-data?symbol=${symbol}&expiry=${expiry}&lotSize=${lot}`;
    // console.log(url);
    
    try {
      const response = await axios.get(url);
      setSelectedPrice(response.data)
      setOptionChainData(response.data.OptionChain);
    } catch (error) {
      console.error('Error fetching option chain data:', error);
    }
  }, [symbol, lot, expiry]);

  useEffect(() => {
    const interval = setInterval(fetchOptionChainData, 3000);
    return () => clearInterval(interval);
  }, [fetchOptionChainData]);

  useEffect(() => {
    console.log(optionChainData);
  }, [optionChainData]);

 const desiredColumns = [
    'calIv','calTv','cvega', 'ctheta', 'cgamma', 'cdelta', 'civ','callOIchg', 'callOI', 'callVol', 'callltpchg', 'callltp','calReversal',
    'strike','putReversal','putLTP' ,  'putLTPchg', 'putVol', 'putOI', 'putOIchg', 'piv','pdelta', 'pgamma', 'ptheta', 'pvega','putTv','putIv'
];
const newHeaderTitles = [
  'I.V.','T.V.','Vega', 'Theta', 'Gamma', 'Delta',  'IV'  , 'OI Chg', 'OI ', 'Volume ', 'Chg (Pts)', 'LTP' ,  'REVERSAL', 
  'STRIKE', 'REVERSAL',
   'LTP','Chg (Pts)', 'VOLUME ', 'OI ',  'OI Chg', 'IV'  , 'Delta', 'Gamma', 'Theta', 'Vega','T.V.','I.V.'
    ];


  return (
    <div>
      <h1>Fetch Time : {optionChainData.length>0?optionChainData[0]['FetchTime']:"NO data"}</h1>
      {/* Uncomment and adapt this block for rendering option chain data */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {newHeaderTitles.map((columnName, index) => (
                  <TableCell key={index}>{columnName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {optionChainData.map((item, index) => (
                <TableRow key={index}>
                  {desiredColumns?.map((items, index) => (
                    <TableCell key={index}>{item[items]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default DashBoard;