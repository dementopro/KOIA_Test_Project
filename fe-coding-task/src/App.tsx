import { useForm, FormProvider } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { FormData, HouseType } from './utils/types';
import { useGraphData } from './hooks/useGraphData';
import HouseForm from './components/Form';
import PriceGraph from './components/PriceGraph';
import GraphHistory from './components/GraphHistory';
import { useGraphStatistics } from './hooks/useGraphStatistics';
import './App.css';

function App() {
  const methods = useForm<FormData>({
    defaultValues: {houseType: HouseType.ALL_HOUSES, quarters: [0, 7]}
  });
  const { graphData } = useGraphData();
  const { savedStatistics, refreshStatistics } = useGraphStatistics();

  return (
    <div className="App">
      <FormProvider {...methods}>
        <div className="app-container">
          <HouseForm graphData={graphData} />
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <PriceGraph graphData={graphData} refreshStatistics={refreshStatistics} />
            </Grid>
            <Grid item sm={12} md={6}>
              <GraphHistory savedStatistics={savedStatistics} />
            </Grid>
          </Grid>
        </div>
      </FormProvider>
    </div>
  );
}

export default App;
