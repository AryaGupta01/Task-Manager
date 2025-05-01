import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import TaskDistributionChart from './TaskDistributionChart';
import CompletionRateChart from './CompletionRateChart';


import { getTaskDistribution, getCompletionRate} from '../../api';


function DashboardPage() {
  const [taskDistributionData, setTaskDistributionData] = useState(null);
  const [completionRateData, setCompletionRateData] = useState(null);
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const distributionData = await getTaskDistribution();
        setTaskDistributionData(distributionData);

        const rateData = await getCompletionRate();
        console.log(rateData);
        
        setCompletionRateData(rateData);

        
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task Dashboard
      </Typography>
      {error && (
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#ffebee' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f' }}>
            Error
          </Typography>
            <Typography variant="body1" sx={{ color: '#d32f2f' }}>
            {error}
          </Typography>
        </Paper>
        </Grid>
      )}


      <Grid container spacing={3}>
        {/* Task Distribution by Priority */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            
            <div>{taskDistributionData && <TaskDistributionChart data={taskDistributionData} />}
            </div>
          </Paper>
        </Grid>

        {/* Completion Rate */}
        <Grid item xs={12} md={6} lg={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            
            {completionRateData && <CompletionRateChart data={completionRateData} />}
          </Paper>
        </Grid>

        
      </Grid>
    </Container>
  );
}

export default DashboardPage;