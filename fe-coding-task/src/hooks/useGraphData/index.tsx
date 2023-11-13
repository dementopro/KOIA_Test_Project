import { useEffect, useState } from 'react';
import { fetchPriceData } from '../../api';
import { HouseType, GraphData } from '../../utils/types';
import { StatisticsData } from '../../utils/types';
import { useSearchParams } from 'react-router-dom';
import { getQuarterWithPairedSquarePerMeterPrice } from './getQuarterWithPairedSquarePerMeterPrice';
import { getDesiredQuartersArray } from './getDesiredQuartersArray';

export function useGraphData () {
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [searchParams,] = useSearchParams()

  useEffect(() => {
    const startQuarter = searchParams.get('startQuarter') ?? ''
    const endQuarter = searchParams.get('endQuarter') ?? ''
    const houseType = searchParams.get('houseType') ?? ''
    const statisticsStorage: StatisticsData[] = JSON.parse(localStorage.getItem('statistics') || 'null');
    const savedGraphData = statisticsStorage?.find(storageElement =>
      storageElement.startQuarter === startQuarter &&
      storageElement.endQuarter === endQuarter &&
      storageElement.houseType === houseType
    );
    if(savedGraphData) {
      setGraphData({ chartPoints: savedGraphData.chartPoints, houseType: savedGraphData.houseType })
      return;
    }
    const getGraphData = async () => {
      const quartersArray = getDesiredQuartersArray(startQuarter, endQuarter);
      const houseTypeApiValue = getHouseTypeApiValue(houseType);
      try {
        const graphRawData = await fetchPriceData(quartersArray, houseTypeApiValue)
        const quarterWithPairedSquarePerMeterPrice = getQuarterWithPairedSquarePerMeterPrice(graphRawData.value, quartersArray)
        setGraphData({ chartPoints: quarterWithPairedSquarePerMeterPrice, houseType })
      } catch (error) {
        console.log(error)
      }
    }
    if (startQuarter && endQuarter && houseType) {
      getGraphData();
    }
  }, [searchParams])
  const getHouseTypeApiValue = (houseType: string): string | undefined => {
    switch (houseType) {
      case HouseType.ALL_HOUSES:
        return '00';
      case HouseType.SMALL_HOUSES:
        return '02';
      case HouseType.APARTMENT_HOUSES:
        return '03';
      default:
        return undefined;
    }
  }

  return {
    graphData
  }
}
