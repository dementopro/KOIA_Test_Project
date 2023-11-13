import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, BarChart, Line, CartesianGrid, XAxis, YAxis, Bar, Legend, Tooltip } from 'recharts';
import { Button, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BarChartIcon from '@mui/icons-material/BarChart';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { useSearchParams } from 'react-router-dom';
import { GraphData, StatisticsData } from '../../utils/types';

interface PriceGraphProps {
  graphData: GraphData | null
  refreshStatistics: () => void
}

enum GraphType {
  LINE = "LINE",
  BAR = "BAR"
}

const PriceGraph = ({ graphData, refreshStatistics }: PriceGraphProps) => {
  const [graphType, setGraphType] = useState<string | null>(GraphType.LINE);
  const [inputValue, setInputValue] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [searchParams,] = useSearchParams();
  const startQuarter = searchParams.get('startQuarter');
  const endQuarter = searchParams.get('endQuarter');
  const houseType = searchParams.get('houseType');
  const commentKey = `${startQuarter}-${endQuarter}-${houseType}`;

  useEffect(() => {
    const storedComment = localStorage.getItem(commentKey);
    if (storedComment) {
      setComment(storedComment);
    } else {
      setComment('');
    }
  }, [searchParams, commentKey]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleAddComment = () => {
    setComment(inputValue)
    localStorage.setItem(commentKey, inputValue);
  };

  const handleSaveGraphData = () => {
    const statisticsStorage = JSON.parse(localStorage.getItem('statistics') || '[]');
    const savedGraphData = statisticsStorage?.find((storageElement: StatisticsData) =>
      storageElement.startQuarter === startQuarter &&
      storageElement.endQuarter === endQuarter &&
      storageElement.houseType === houseType
    );
    if (savedGraphData) {
      statisticsStorage.splice(statisticsStorage.indexOf(savedGraphData), 1)
    }
    const statisticsToSave = {
      startQuarter,
      endQuarter,
      chartPoints: graphData?.chartPoints,
      houseType: graphData?.houseType,
      comment
    }
    statisticsStorage.unshift(statisticsToSave)
    localStorage.setItem('statistics', JSON.stringify(statisticsStorage))
    refreshStatistics()
  }

  const handleGraphType = (
    event: React.MouseEvent<HTMLElement>,
    newGraphType: string | null,
  ) => {
    setGraphType(newGraphType);
  };

  return (
    graphData &&
    <div className="graph-container">
      <h2>Chart for {graphData.houseType} house type</h2>
      <ToggleButtonGroup
        value={graphType}
        exclusive
        onChange={handleGraphType}
      >
        <ToggleButton value={GraphType.LINE}>
          <StackedLineChartIcon />
        </ToggleButton>
        <ToggleButton value={GraphType.BAR}>
          <BarChartIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          {
            graphType === "LINE" ?
              <LineChart data={graphData.chartPoints} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
              </LineChart> :
              <BarChart data={graphData.chartPoints} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#1976d2" />
              </BarChart>
          }
        </ResponsiveContainer>
      </div>

      <div className="graph-comments">
        <TextField id="outlined-basic" variant="outlined" value={inputValue} onChange={handleInputChange} />
        <Button variant="outlined" onClick={handleAddComment}>Add Comment</Button>
        <Button variant="outlined" onClick={handleSaveGraphData}>Save Graph Data</Button>
      </div>
      <p>{comment}</p>
    </div>
  )
}

export default PriceGraph
