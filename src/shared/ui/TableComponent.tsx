import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from '@mui/material';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D5E1FF',
    color: '#181A1A',
    fontSize: 12,
    fontWeight: 400,
    padding: '12px 22px',
    lineHeight: '16px',
    borderBottom: 'none',
    '&:first-of-type': {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    '&:last-of-type': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: 'none',
    backgroundColor: 'white',
    verticalAlign: 'top',
    padding: '6px 0',
  },
}));

type Column = {
  id: string;
  label: string;
  width?: number | string;
  flex?: number;
};

type TableComponentProps<T> = {
  columns: Column[];
  rows: T[];
};

export const TableComponent = <T extends { [key: string]: React.ReactNode }>({ columns, rows }: TableComponentProps<T>) => {
  return (
    <TableContainer sx={{ marginTop: '28px' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell 
                key={column.id} 
                sx={{ width: column.width, flex: column.flex  }}
              >
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <Box sx={{ height: '16px' }}></Box>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <StyledTableCell 
                  key={column.id} 
                  component="th" 
                  scope="row" 
                  sx={{ width: column.width, flex: column.flex }}
                >
                  {row[column.id]}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};