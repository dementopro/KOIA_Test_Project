import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography
} from '@mui/material';
import { StatisticsData } from '../../utils/types';
import { useSearchParams } from 'react-router-dom';

interface Props {
  savedStatistics: StatisticsData[]
}

const GraphHistory = ({ savedStatistics }: Props) => {
  const [, setSearchParams] = useSearchParams();

  const handleDisplayGraph = (savedStatistics: StatisticsData) => {
    const startQuarter = savedStatistics.startQuarter;
    const endQuarter = savedStatistics.endQuarter;
    const queryParams = new URLSearchParams({
      startQuarter,
      endQuarter,
      houseType: savedStatistics.houseType,
    });
    setSearchParams(queryParams);
  }

  return (
    <div className='history-container'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Typography variant='caption' fontWeight={800}>Quarters</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='caption' fontWeight={800}>House Type</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='caption' fontWeight={800}>Comment</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='caption' fontWeight={800}>Display data</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedStatistics.map((row: StatisticsData, index: number) => (
              <TableRow key={index}>
                <TableCell align='center'>{row.startQuarter} - {row.endQuarter}</TableCell>
                <TableCell align='center'>{row.houseType}</TableCell>
                <TableCell align='center'>{row.comment}</TableCell>
                <TableCell align='center'>
                  <Button variant="contained" color="primary" onClick={() => handleDisplayGraph(row)}>
                    Display saved data
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default GraphHistory
