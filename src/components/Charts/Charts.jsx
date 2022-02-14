import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2'
import styles from './Charts.module.css';
// import {CategoryScale} from 'chart.js'; 
// Chart.register(CategoryScale)
import Chart from 'chart.js/auto'

const Charts = ({ data: {confirmed, deaths, recovered}, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const dataResult = await fetchDailyData()
      // console.  (dataResult, "dataResult");
      setDailyData(await fetchDailyData())
    }
    
    fetchAPI(); 
  }, [])

  console.log(dailyData[0], "dailyData")
  const lineChart = (
    dailyData.length 
    ? (
      <Line 
    data = {{
      labels: dailyData.map(({ date }) => {
        // console.log(date, "date")
        return date
      }),
      datasets: [{
        data: dailyData.map(({ confirmed }) => {
          // console.log(confirmed, "confirmed")
          return confirmed
        }),
        label: 'Infected',
        borderColor: '#333ff',
        fill: true
      } , {  
        data: dailyData.map(({ deaths }) => deaths),
        label: 'Deaths',
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        fill: true
      }]
    }}
    options={{
      scales: {
      yAxex: 
        {
          ticks: 
            {stepSize: 100000},
            min: 0,
            max: 1000000,       
        },
      },
    }}
    
    />) : null
  ) 

  const barChart  = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)'
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          }]
        }}
        options={{
          legend: { display: false}, 
          title: { display: true, text: `Current state in ${country}`},  
        }}
      />
    ) : null
  )

  return( 
    <div className={styles.container}>
        {country ? barChart : lineChart}
    </div>
    );
};

export default Charts;
