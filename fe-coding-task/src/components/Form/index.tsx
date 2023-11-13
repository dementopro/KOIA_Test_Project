import { useFormContext } from 'react-hook-form';
import { Button, CircularProgress, Typography } from '@mui/material';
import HouseSelect from './HouseSelect';
import QuarterRangePicker from './QuarterRangePicker';
import { useFilters } from '../../hooks/useFilters';
import { FormData, GraphData } from '../../utils/types';

interface Props {
  graphData: GraphData | null
}

const HouseForm = ({ graphData }: Props) => {
  const {
    getQuarterString,
    onSubmit,
    handleSubmit,
    isGraphDataLoading
  } = useFilters()
  const { watch } = useFormContext<FormData>()
  const quarterValues = watch('quarters')

  return (
    <>
      <Typography variant="h3">KOIA Frontend Coding Task</Typography>
      <div className="inputs-container">
        <div className="quarter-slider">
          <Typography variant='body1' fontWeight={800}>Select quarters range</Typography>
          <QuarterRangePicker
            getQuarterString={getQuarterString}
          />
          <Typography variant="body1">
            Selected range: {getQuarterString(quarterValues[0])} - {getQuarterString(quarterValues[1])}
          </Typography>
        </div>
        <div className="house-type-dropdown">
          <Typography variant='body1' fontWeight={800}>Select house Type</Typography>
          <HouseSelect />
        </div>
      </div>
      <Button variant="outlined" sx={{ marginTop: 5 }} onClick={handleSubmit(onSubmit)}>
        {isGraphDataLoading && !graphData && <CircularProgress size={20} sx={{ marginRight: '8px' }} />}
        Generate graph
      </Button>
    </>
  )
}

export default HouseForm;
