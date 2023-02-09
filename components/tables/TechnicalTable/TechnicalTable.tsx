import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';

import CustomTableRow from '../TableRow/TebleRow';
import Paper from '@mui/material/Paper';
import { CamperTechnicals } from '../../../shared/types';
import { Typography, Divider } from '@mui/material';

type Props = {
  technicals: CamperTechnicals;
};

const TechnicalTable = ({ technicals }: Props) => {
  return (
    <>
      <Typography variant="h2" align="center">
        Dane techniczne:
      </Typography>
      <Divider sx={{ marginTop: '1rem' }} />

      <TableContainer sx={{ marginY: '2rem' }}>
        <Table sx={{ minWidth: 300 }} aria-label="technical table">
          <TableBody>
            <CustomTableRow name="Model" value={technicals.model} />
            <CustomTableRow name="Marka" value={technicals.brand} />
            <CustomTableRow name="Masa" value={technicals.weight} />
            <CustomTableRow name="Wymiary" value={technicals.dimensions} />
            <CustomTableRow name="Rok produkcji" value={technicals.year} />
            <CustomTableRow
              name="Wymiary + baznik rowerowy"
              value={technicals.dimensionsBike}
            />
            <CustomTableRow name="Typ paliwa" value={technicals.fuel} />
            <CustomTableRow
              name="Pojemność baku paliwa"
              value={technicals.tank}
            />
            <CustomTableRow
              name="Pojemność silnika"
              value={technicals.cylinderCap}
            />
            <CustomTableRow name="Moc" value={technicals.power} />
            <CustomTableRow
              name="Zużycie paliwa"
              value={technicals.consumption}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TechnicalTable;
