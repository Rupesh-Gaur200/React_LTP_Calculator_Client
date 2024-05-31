import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


function DashBoard(){
    const columns = [
        { id: 'name', label: 'IV',  align:'center'},
        { id: 'code', label: 'OL',  align:'center' },
        {
          id: 'population',
          label: 'OL chg',
        
          align: 'center',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'size',
          label: 'Volume',
         
          align: 'center',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'density',
           label: 'Reversal',
         
          align: 'center',
          format: (value) => value.toFixed(2),
        },
        {
            id: 'density',
            label: 'Strike',
      
            align: 'center',
            format: (value) => value.toFixed(2),
          },
          {
            id: 'density',
            label: 'Reversal',
    
            align: 'center',
            format: (value) => value.toFixed(2),
          },
          {
            id: 'size',
            label: 'Volume',
            
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
          },
          {
            id: 'population',
            label: 'OL chg',
        
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
          },  { id: 'code', label: 'OL', align:'center'  }, { id: 'name', label: 'IV', align:'center' },
      ];
      
      function createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
      }
      
      const rows = [
        createData('India', 'IN', 1324171354, 3287263),
        createData('China', 'CN', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973, 301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
        createData('India', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973,  'IN', 1324171354, 3287263),
        createData('China', 'CN',301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
      ];
      
      
    return(
         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="bo"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} className="border-[1px] border-gray-400">
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>
        
    )
}

export default DashBoard