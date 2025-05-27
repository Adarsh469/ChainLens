/**
 * @file ActivityChart.tsx
 * @description Chart component for displaying wallet transaction activity
 * @author Adarsh469
 * @lastModified 2025-05-27 13:05:22
 */

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ActivityChartProps {
  address: string;
  activityData: {
    labels: string[];
    values: number[];
  } | null;
  isLoading: boolean;
}

const ActivityChart = ({ address, activityData, isLoading }: ActivityChartProps) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Transaction Activity',
        data: [] as number[],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });

  useEffect(() => {
    if (activityData) {
      setChartData({
        labels: activityData.labels,
        datasets: [
          {
            label: 'Transaction Activity',
            data: activityData.values,
            borderColor: 'rgb(14, 165, 233)',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      });
    }
  }, [activityData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        titleColor: 'rgb(255, 255, 255)',
        bodyColor: 'rgb(209, 213, 219)',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="card p-6 h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading activity data...</div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Transaction Activity</h3>
      <div className="h-[400px] w-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ActivityChart;