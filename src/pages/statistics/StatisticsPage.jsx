import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PrimaryPieChart from '../../components/PrimaryPieChart';
import { useUsersContext } from '../../context/usersContext';
import styles from './statistics.module.css';

function StatisticsPage() {
  const { usersData, setUsersData } = useUsersContext();
  const [ chartData, setChartData ] = useState([]);

  useEffect(() => {
    if (usersData.length) {
      const countryCounts = {};
      usersData.forEach((item) => {
        const country = item.country;
        if (countryCounts[country]) {
          countryCounts[country]++;
        } else {
          countryCounts[country] = 1;
        }
      });

      const result = Object.keys(countryCounts).map((country) => ({
        name: country,
        value: countryCounts[country],
      }));
      setChartData(result);
    }
  }, [usersData]);

  return <div className={styles.pageRoot}>
    <Typography variant="h6">StatisticsPage</Typography>    
    <PrimaryPieChart data={chartData}/>
  </div>;
}

export default StatisticsPage;
