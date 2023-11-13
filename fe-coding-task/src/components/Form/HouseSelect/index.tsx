import { NativeSelect } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { HouseType } from '../../../utils/types';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../../../utils/types';

const HouseSelect = () => {
  const { register, setValue } = useFormContext<FormData>()
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue('houseType', event.target.value)
  }
  
  return (
    <NativeSelect
      {...register('houseType')}
      onChange={onChange}
    >
      <option value={HouseType.ALL_HOUSES}>{HouseType.ALL_HOUSES}</option>
      <option value={HouseType.SMALL_HOUSES}>{HouseType.SMALL_HOUSES}</option>
      <option value={HouseType.APARTMENT_HOUSES}>{HouseType.APARTMENT_HOUSES}</option>
    </NativeSelect>
  )
}

export default HouseSelect
