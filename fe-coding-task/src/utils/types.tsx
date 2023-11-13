import { FieldValues } from 'react-hook-form';

export interface FormData extends FieldValues {
  houseType: string;
  quarters: number[];
}

export interface GraphData {
	chartPoints: {
		name: string,
		price: number
	}[],
	houseType: string
}

export interface StatisticsData {
  startQuarter: string,
  endQuarter: string,
  chartPoints: {
    name: string,
    price: number
  }[],
  houseType: string,
  comment: string
}

export enum HouseType {
	ALL_HOUSES = 'Boliger i alt',
	SMALL_HOUSES = 'Småhus',
	APARTMENT_HOUSES = 'Blokkleiligheter'
}
