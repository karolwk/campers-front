import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import React from 'react';
type Props = {
  name: string;
  value: string;
};

const TebleRow = ({ name, value }: Props) => {
  if (!value) {
    return <></>;
  }
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="center">{value}</TableCell>
    </TableRow>
  );
};

export default TebleRow;
