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
import { CompareContext } from '../../Context/CompareButton';

function DashBoard() {
  const [optionChainData, setOptionChainData] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  const userName="ltpalpha"
  const Password="R$az!fQ?ui6%I5h&kn1"
  const credentials = btoa(`${userName}:${Password}`);

  // Retrieve user context values
  const userState = useContext(UserContext);

  
  const symbol = userState.userSymbol;
  const lot = userState.lot;
  const expiry = userState.expiry;

  // Fetch option chain data from API
  const fetchOptionChainData = useCallback(async () => {
    const url = `/api/optionChain/fetch-data?symbol=${symbol}&expiry=${expiry}&lotSize=${lot} `;
    try {
      const response = await axios.get(url ,{
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': '*/*',
        },
      });
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
    userState.setfetchPrice(selectedPrice)
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

const ReversalTable = ()=>{

  const ReversalColumns =[
    'IV', 'OI Chg', 'OI', 'Volume', 'Chg (Pts)', 'LTP', 'REVERSAL',
    'STRIKE', 'REVERSAL', 'LTP', 'Chg (Pts)', 'VOLUME', 'OI', 'OI Chg', 'IV',
  
   ]
  
  const ReversalDesiredColumn=[
  
    
     'civ', 'callOIchg', 'callOI', 'callVol', 'callltpchg', 'callltp', 'calReversal',
      'strike', 'putReversal', 'putLTP', 'putLTPchg', 'putVol', 'putOI', 'putOIchg', 'piv', 
    
  ]

  return(
<div>
      {/* <h1>Fetch Time : {optionChainData.length > 0 ? optionChainData[0]['FetchTime'] : "No data"}</h1> */}
      {/* Render option chain data in a table */}
      <Paper elevation={24} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ p: 1, minWidth: 400 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                {ReversalColumns.map((columnName, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      backgroundColor: columnName === 'STRIKE' ? 'orange' : 'inherit',
                      color: columnName === 'STRIKE' ? 'white' : 'inherit',
                      fontWeight: columnName === 'STRIKE' ? 'bold' : 'inherit',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
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
                optionChainData?.forEach((item, index) => {
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

  )
}


const VegaTable = ()=>{

  const VegaDesiredColumn=[

    'Vega', 'civ', 'callOIchg', 'callOI', 'callVol', 'callltpchg', 'callltp', 'calReversal',
    'strike', 'putReversal', 'putLTP', 'putLTPchg', 'putVol', 'putOI', 'putOIchg', 'piv', 'Vega'
   ]
  
   const VegaColumn=[
       
   'Vega', 'IV', 'OI Chg', 'OI', 'Volume', 'Chg (Pts)', 'LTP', 'REVERSAL',
    'STRIKE', 'REVERSAL', 'LTP', 'Chg (Pts)', 'VOLUME', 'OI', 'OI Chg', 'IV','Vega'
  
   ]

  return(
<div>
      {/* <h1>Fetch Time : {optionChainData.length > 0 ? optionChainData[0]['FetchTime'] : "No data"}</h1> */}
      {/* Render option chain data in a table */}
      <Paper elevation={24} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ p: 1, minWidth: 400 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                {VegaColumn.map((columnName, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      backgroundColor: columnName === 'STRIKE' ? 'orange' : 'inherit',
                      color: columnName === 'STRIKE' ? 'white' : 'inherit',
                      fontWeight: columnName === 'STRIKE' ? 'bold' : 'inherit',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
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
                optionChainData?.forEach((item, index) => {
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
                      {VegaDesiredColumn.map((column, colIndex) => (
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

  )
}

const DeltaTable = ()=>{
  
const DeltaDesiredColumn=[

  'cdelta','civ', 'callOIchg', 'callOI', 'callVol', 'callltpchg', 'callltp', 'calReversal',
  'strike', 'putReversal', 'putLTP', 'putLTPchg', 'putVol', 'putOI', 'putOIchg', 'piv','pdelta'
]

const DeltaColumn=[
  'Delta','IV', 'OI Chg', 'OI', 'Volume', 'Chg (Pts)', 'LTP', 'REVERSAL',
  'STRIKE', 'REVERSAL', 'LTP', 'Chg (Pts)', 'VOLUME', 'OI', 'OI Chg', 'IV','Delta'
]

  return(
<div>
      {/* <h1>Fetch Time : {optionChainData.length > 0 ? optionChainData[0]['FetchTime'] : "No data"}</h1> */}
      {/* Render option chain data in a table */}
      <Paper elevation={24} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ p: 1, minWidth: 400 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                {DeltaColumn.map((columnName, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      backgroundColor: columnName === 'STRIKE' ? 'orange' : 'inherit',
                      color: columnName === 'STRIKE' ? 'white' : 'inherit',
                      fontWeight: columnName === 'STRIKE' ? 'bold' : 'inherit',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
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
                optionChainData?.forEach((item, index) => {
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
                      {DeltaDesiredColumn.map((column, colIndex) => (
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

  )
}

const ThetaTable = ()=>{
  
const ThetaDesiredColumn =[
  'ctheta','civ', 'callOIchg', 'callOI', 'callVol', 'callltpchg', 'callltp', 'calReversal',
  'strike', 'putReversal', 'putLTP', 'putLTPchg', 'putVol', 'putOI', 'putOIchg', 'piv','ptheta'

]

const ThetaColumn=[

  'Theta', 'IV', 'OI Chg', 'OI', 'Volume', 'Chg (Pts)', 'LTP', 'REVERSAL',
  'STRIKE', 'REVERSAL', 'LTP', 'Chg (Pts)', 'VOLUME', 'OI', 'OI Chg', 'IV','Theta'

]

  return(
<div>
      {/* <h1>Fetch Time : {optionChainData.length > 0 ? optionChainData[0]['FetchTime'] : "No data"}</h1> */}
      {/* Render option chain data in a table */}
      <Paper elevation={24} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ p: 1, minWidth: 400 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                {ThetaColumn.map((columnName, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      backgroundColor: columnName === 'STRIKE' ? 'orange' : 'inherit',
                      color: columnName === 'STRIKE' ? 'white' : 'inherit',
                      fontWeight: columnName === 'STRIKE' ? 'bold' : 'inherit',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
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
                optionChainData?.forEach((item, index) => {
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
                      {ThetaDesiredColumn.map((column, colIndex) => (
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

  )
}

const GammaTable = ()=>{
  const GammaDesiredColumn=[
    'cgamma','civ', 'callOIchg', 'callOI', 'callVol', 'callltpchg', 'callltp', 'calReversal',
    'strike', 'putReversal', 'putLTP', 'putLTPchg', 'putVol', 'putOI', 'putOIchg', 'piv','pgamma'
  
  ]
  const GammaColumn=[
  
    'Gamma','IV', 'OI Chg', 'OI', 'Volume', 'Chg (Pts)', 'LTP', 'REVERSAL',
    'STRIKE', 'REVERSAL', 'LTP', 'Chg (Pts)', 'VOLUME', 'OI', 'OI Chg', 'IV','Gamma'
  ]

  return(
<div>
      {/* <h1>Fetch Time : {optionChainData.length > 0 ? optionChainData[0]['FetchTime'] : "No data"}</h1> */}
      {/* Render option chain data in a table */}
      <Paper elevation={24} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ p: 1, minWidth: 400 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                {GammaColumn.map((columnName, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      backgroundColor: columnName === 'STRIKE' ? 'orange' : 'inherit',
                      color: columnName === 'STRIKE' ? 'white' : 'inherit',
                      fontWeight: columnName === 'STRIKE' ? 'bold' : 'inherit',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
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
                optionChainData?.forEach((item, index) => {
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
                      {GammaDesiredColumn.map((column, colIndex) => (
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

  )
}

const IVTvTable = ()=>{
  const Iv_TvColumnDes=[
    'calIv', 'calTv', 'civ', 'callOIchg', 'callOI', 'callVol', 'callltpchg', 'callltp', 'calReversal',
    'strike', 'putReversal', 'putLTP', 'putLTPchg', 'putVol', 'putOI', 'putOIchg', 'piv','putTv', 'putIv'
  
  ]
  const Iv_TvColumn=[
  
    'IV', 'OI Chg', 'OI', 'Volume', 'Chg (Pts)', 'LTP', 'REVERSAL',
    'STRIKE', 'REVERSAL', 'LTP', 'Chg (Pts)', 'VOLUME', 'OI', 'OI Chg', 'IV',
  
  ]

  return(
<div>
      {/* <h1>Fetch Time : {optionChainData.length > 0 ? optionChainData[0]['FetchTime'] : "No data"}</h1> */}
      {/* Render option chain data in a table */}
      <Paper elevation={24} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ p: 1, minWidth: 400 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                {Iv_TvColumn.map((columnName, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      backgroundColor: columnName === 'STRIKE' ? 'orange' : 'inherit',
                      color: columnName === 'STRIKE' ? 'white' : 'inherit',
                      fontWeight: columnName === 'STRIKE' ? 'bold' : 'inherit',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
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
                optionChainData?.forEach((item, index) => {
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
                      {Iv_TvColumnDes.map((column, colIndex) => (
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

  )
}

let component ;

 switch('Reversal'){
    case 'Reversal':
      component=<ReversalTable></ReversalTable>
      break;
    case 'Vega':
      component=<VegaTable></VegaTable>
      break
   
    case 'Gamma':
      component=<GammaTable></GammaTable>
      break
    case 'Delta':
      component=<DeltaTable></DeltaTable>
      break
    case 'IVTV':
      component=<IVTvTable></IVTvTable>
      break
    default:
      component=<ReversalTable></ReversalTable>

 }

  return (
    <div>
    {/* <h1>Fetch Time : {optionChainData.length > 0 ? optionChainData[0]['FetchTime'] : "No data"}</h1> */}
    {/* Render option chain data in a table */}
    <Paper elevation={24} sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ p: 1, minWidth: 400 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              {ReversalColumns.map((columnName, index) => (
                <TableCell
                  key={index}
                  sx={{
                    backgroundColor: columnName === 'STRIKE' ? 'orange' : 'inherit',
                    color: columnName === 'STRIKE' ? 'white' : 'inherit',
                    fontWeight: columnName === 'STRIKE' ? 'bold' : 'inherit',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
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
              optionChainData?.forEach((item, index) => {
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


// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import { useContext, useState, useEffect, useCallback } from "react";
// import { UserContext } from "../../Context/Context";
// import { fetchOptionChainData } from '../../Service/FectData';

// function formatIndianNumber(num) {
//   const isNegative = num < 0;
//   num = Math.abs(num);

//   if (num < 1000) {
//     return isNegative ? `-${num}` : `${num}`;
//   }

//   let thousands = num % 1000;
//   let remaining = Math.floor(num / 1000);
//   let formattedNumber = thousands.toString().padStart(3, '0');

//   while (remaining > 0) {
//     if (remaining < 100) {
//       formattedNumber = remaining.toString() + ',' + formattedNumber;
//       break;
//     } else {
//       let lastPair = remaining % 100;
//       remaining = Math.floor(remaining / 100);
//       formattedNumber = lastPair.toString().padStart(2, '0') + ',' + formattedNumber;
//     }
//   }

//   return (isNegative ? '-' : '') + formattedNumber;
// }

// function formatValueWithPercentage(value, maxValue) {
//   const percentage = ((value / maxValue) * 100).toFixed(2);
//   return `${formatIndianNumber(value)} (${percentage}%)`;
// }

// function formatValueWithColor(value) {
//   const color = value < 0 ? 'red' : 'green';
//   return <span style={{ color }}>{formatIndianNumber(value)}</span>;
// }

// function DashBoard() {
//   const [optionChainData, setOptionChainData] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState("");
//   const [maxValues, setMaxValues] = useState({
//     callOIchg: 0,
//     callOI: 0,
//     callVol: 0,
//     putOIchg: 0,
//     putOI: 0,
//     putVol: 0
//   });

//   const userState = useContext(UserContext);
//   const { userSymbol: symbol, lot, expiry } = userState;

//   const fetchAndSetOptionChainData = useCallback(async () => {
//     try {
//       const data = await fetchOptionChainData(symbol, expiry, lot);
//       setSelectedPrice(data.Price_S);
//       setOptionChainData(data.OptionChain);

//       // Find max values for each column to be used for percentage calculations
//       const newMaxValues = {
//         callOIchg: Math.max(...data.OptionChain.map(item => item.callOIchg)),
//         callOI: Math.max(...data.OptionChain.map(item => item.callOI)),
//         callVol: Math.max(...data.OptionChain.map(item => item.callVol)),
//         putOIchg: Math.max(...data.OptionChain.map(item => item.putOIchg)),
//         putOI: Math.max(...data.OptionChain.map(item => item.putOI)),
//         putVol: Math.max(...data.OptionChain.map(item => item.putVol))
//       };
//       setMaxValues(newMaxValues);
//     } catch (error) {
//       console.error('Error fetching option chain data:', error);
//     }
//   }, [symbol, lot, expiry]);

//   useEffect(() => {
//     const interval = setInterval(fetchAndSetOptionChainData, 3000);
//     return () => clearInterval(interval);
//   }, [fetchAndSetOptionChainData]);

//   useEffect(() => {
//     userState.setfetchTime(optionChainData.length > 0 ? optionChainData[0]['FetchTime'] : "No data");
//     console.log(optionChainData);
//   }, [optionChainData, userState]);

//   useEffect(() => {
//     userState.setfetchPrice(selectedPrice);
//     console.log(selectedPrice);
//   }, [selectedPrice, userState]);

//   const columnsConfig = {
//     Reversal: {
//       desiredColumns: [
//         'civ', 'callOIchg', 'callOI', 'callVol', 'callltpchg', 'callltp', 'calReversal',
//         'strike', 'putReversal', 'putLTP', 'putLTPchg', 'putVol', 'putOI', 'putOIchg', 'piv'
//       ],
//       headers: [
//         'IV', 'OI Chg', 'OI', 'Volume', 'Chg (Pts)', 'LTP', 'REVERSAL',
//         'STRIKE', 'REVERSAL', 'LTP', 'Chg (Pts)', 'VOLUME', 'OI', 'OI Chg', 'IV'
//       ]
//     }
//   };

//   const selectedColumns = columnsConfig.Reversal.desiredColumns;
//   const selectedHeaders = columnsConfig.Reversal.headers;

//   return (
//     <div>
//       <Paper elevation={24} sx={{ width: '100%', overflow: 'hidden' }}>
//         <TableContainer sx={{ p: 1, minWidth: 400 }} component={Paper}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {selectedHeaders.map((columnName, index) => (
//                   <TableCell
//                     key={index}
//                     sx={{
//                       backgroundColor: columnName === 'STRIKE' ? 'orange' : 'inherit',
//                       color: columnName === 'STRIKE' ? 'white' : 'inherit',
//                       fontWeight: columnName === 'STRIKE' ? 'bold' : 'inherit',
//                       position: 'sticky',
//                       top: 0,
//                       zIndex: 1,
//                       textAlign: 'center'
//                     }}
//                   >
//                     {columnName}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {(() => {
//                 let customRowIndex = -1;
//                 optionChainData.forEach((item, index) => {
//                   if (customRowIndex === -1 && parseFloat(selectedPrice) <= parseFloat(item.strike)) {
//                     customRowIndex = index;
//                   }
//                 });

//                 if (customRowIndex === -1) {
//                   return optionChainData.map((item, rowIndex) => (
//                     <TableRow key={rowIndex}>
//                       {selectedColumns.map((column, colIndex) => (
//                         <TableCell
//                           key={colIndex}
//                           sx={{
//                             backgroundColor: column === 'strike' ? 'orange' : 'inherit',
//                             color: column === 'strike' ? 'white' : 'inherit',
//                             fontWeight: column === 'strike' ? 'bold' : 'inherit',
//                             textAlign: 'center'
//                           }}
//                         >
//                           {['callOIchg', 'putOIchg', 'callltpchg', 'putLTPchg'].includes(column) ? 
//                             formatValueWithColor(item[column]) : 
//                             ['callOI', 'callVol', 'putOI', 'putVol'].includes(column) ? 
//                             formatValueWithPercentage(item[column], maxValues[column]) : 
//                             item[column]}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ));
//                 }

//                 const startIndex = Math.max(0, customRowIndex - 10);
//                 const endIndex = Math.min(optionChainData.length, customRowIndex + 10);
//                 const displayedData = optionChainData.slice(startIndex, endIndex);

//                 return displayedData.map((item, rowIndex) => (
//                   <React.Fragment key={rowIndex}>
//                     {rowIndex === customRowIndex - startIndex && (
//                       <TableRow key={`custom-${rowIndex}`}>
//                         <TableCell colSpan={selectedColumns.length} sx={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey' }}>
//                           {selectedPrice}
//                         </TableCell>
//                       </TableRow>
//                     )}
//                     <TableRow>
//                       {selectedColumns.map((column, colIndex) => (
//                         <TableCell
//                           key={colIndex}
//                           sx={{
//                             backgroundColor: column === 'strike' ? 'orange' : 'inherit',
//                             color: column === 'strike' ? 'white' : 'inherit',
//                             fontWeight: column === 'strike' ? 'bold' : 'inherit',
//                             textAlign: 'center'
//                           }}
//                         >
//                           {['callOIchg', 'putOIchg', 'callltpchg', 'putLTPchg'].includes(column) ? 
//                             formatValueWithColor(item[column]) : 
//                             ['callOI', 'callVol', 'putOI', 'putVol'].includes(column) ? 
//                             formatValueWithPercentage(item[column], maxValues[column]) : 
//                             item[column]}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   </React.Fragment>
//                 ));
//               })()}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </div>
//   );
// }

// export default DashBoard;
