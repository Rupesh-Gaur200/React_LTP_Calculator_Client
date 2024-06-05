import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { UserContext } from "../../Context/Context";
import { useContext, useState, useEffect, useCallback } from "react";

function DashBoard() {
  const [optionChainData, setOptionChainData] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  // Retrieve user context values
  const userState = useContext(UserContext);
  const symbol = userState.userSymbol;
  const lot = userState.lot;
  const expiry = userState.expiry;

  // Fetch option chain data from API
  const fetchOptionChainData = useCallback(async () => {
    const url = `/api/optionChain/fetch-data?symbol=${symbol}&expiry=${expiry}&lotSize=${lot}`;
    try {
      const response = await axios.get(url);
      setSelectedPrice(response.data.Price_S);
      setOptionChainData(response.data.OptionChain);
    } catch (error) {
      console.error('Error fetching option chain data:', error);
    }
  }, [symbol, lot, expiry]);

  // Set an interval to fetch data every 3 seconds
  useEffect(() => {
    const interval = setInterval(fetchOptionChainData, 3000);
    return () => clearInterval(interval);
  }, [fetchOptionChainData]);

  // Log option chain data for debugging purposes
  useEffect(() => {
    userState.setfetchTime(optionChainData.length>0?optionChainData[0]['FetchTime'] :"No data")
    console.log(optionChainData);
  }, [optionChainData]);
 
  useEffect(() => {
    userState.setfetchPrice(selectedPrice.Price_S)
    console.log(selectedPrice);
  }, [selectedPrice]);
 

  // Define desired columns and their headers
  const desiredColumns = [
    'calIv', 'calTv', 'cvega', 'ctheta', 'cgamma', 'cdelta', 'civ', 'callOIchg', 'callOI', 'callVol', 'callltpchg', 'callltp', 'calReversal',
    'strike', 'putReversal', 'putLTP', 'putLTPchg', 'putVol', 'putOI', 'putOIchg', 'piv', 'pdelta', 'pgamma', 'ptheta', 'pvega', 'putTv', 'putIv'
  ]; 

  const newHeaderTitles = [
    'I.V.', 'T.V.', 'Vega', 'Theta', 'Gamma', 'Delta', 'IV', 'OI Chg', 'OI', 'Volume', 'Chg (Pts)', 'LTP', 'REVERSAL',
    'STRIKE', 'REVERSAL', 'LTP', 'Chg (Pts)', 'VOLUME', 'OI', 'OI Chg', 'IV', 'Delta', 'Gamma', 'Theta', 'Vega', 'T.V.', 'I.V.'
  ];

 const ReversalColumns =[
  'IV', 'OI Chg', 'OI', 'Volume', 'Chg (Pts)', 'LTP', 'REVERSAL',
  'STRIKE', 'REVERSAL', 'LTP', 'Chg (Pts)', 'VOLUME', 'OI', 'OI Chg', 'IV',

 ]

const ReversalDesiredColumn=[

  
   'civ', 'callOIchg', 'callOI', 'callVol', 'callltpchg', 'callltp', 'calReversal',
    'strike', 'putReversal', 'putLTP', 'putLTPchg', 'putVol', 'putOI', 'putOIchg', 'piv', 
  
]


  return (
    <div>
      {/* <h1>Fetch Time : {optionChainData.length > 0 ? optionChainData[0]['FetchTime'] : "No data"}</h1> */}
      {/* Render option chain data in a table */}
      <Paper elevation={24} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ p: 1, minWidth: 400 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {ReversalColumns.map((columnName, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      backgroundColor: columnName === 'STRIKE' ? 'orange' : 'inherit',
                      color: columnName === 'STRIKE' ? 'white' : 'inherit',
                      fontWeight: columnName === 'STRIKE' ? 'bold' : 'inherit'
                    }}
                  >
                    {columnName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(() => {
                let customRowIndex = -1;
                optionChainData.forEach((item, index) => {
                  if (customRowIndex === -1 && parseFloat(selectedPrice) <= parseFloat(item.strike)) {
                    customRowIndex = index;
                  }
                });

                if (customRowIndex === -1) {
                  return optionChainData.map((item, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {desiredColumns.map((column, colIndex) => (
                        <TableCell
                          key={colIndex}
                          sx={{
                            backgroundColor: column === 'strike' ? 'orange' : 'inherit',
                            color: column === 'strike' ? 'white' : 'inherit',
                            fontWeight: column === 'strike' ? 'bold' : 'inherit'
                          }}
                        >
                          {item[column]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ));
                }

                const startIndex = Math.max(0, customRowIndex - 10);
                const endIndex = Math.min(optionChainData.length, customRowIndex + 10);
                const displayedData = optionChainData.slice(startIndex, endIndex);

                return displayedData.map((item, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    {rowIndex === customRowIndex - startIndex && (
                      <TableRow key={`custom-${rowIndex}`}>
                        <TableCell colSpan={desiredColumns.length} sx={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey' }}>
                           {selectedPrice} 
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      {ReversalDesiredColumn.map((column, colIndex) => (
                        <TableCell
                          key={colIndex}
                          sx={{
                            backgroundColor: column === 'strike' ? 'orange' : 'inherit',
                            color: column === 'strike' ? 'white' : 'inherit',
                            fontWeight: column === 'strike' ? 'bold' : 'inherit'
                          }}
                        >
                          {item[column]}
                        </TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                ));
              })()}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default DashBoard;
