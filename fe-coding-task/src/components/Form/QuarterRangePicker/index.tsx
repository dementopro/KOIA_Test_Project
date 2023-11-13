import { Slider } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../../../utils/types';

type RangePickerProps = {
  getQuarterString: (value: number) => string
}

const QuarterRangePicker = ({ getQuarterString }: RangePickerProps) => {
  const { setValue, watch } = useFormContext<FormData>();
  const quarters = watch('quarters');
  const minSliderDistance = 1;
  const handleQuartersChange = (event: Event, newValue: number | number[], activeThumb: number) =>  {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue('quarters',[Math.min(newValue[0], quarters[1] - minSliderDistance), quarters[1]]);
    } else {
      setValue('quarters',[quarters[0], Math.max(newValue[1], quarters[0] + minSliderDistance)]);
    }
  };

  return (
    <Slider
      onChange={handleQuartersChange}
      value={quarters}
      min={0}
      max={58}
      step={1}
      marks={[
        { value: 0, label: '2009K1' },
        { value: 12, label: '2012K1' },
        { value: 24, label: '2015K1' },
        { value: 36, label: '2018K1' },
        { value: 48, label: '2021K1' },
        { value: 58, label: '2023K3' },
      ]}
      disableSwap
      valueLabelFormat={(value: number) => <div>{getQuarterString(value)}</div>}
      valueLabelDisplay="auto"
    />
  );
}

export default QuarterRangePicker
