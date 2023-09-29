import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';

const WarehouseChart = ({ LocationListQuery }: any) => {
  useEffect(() => {
    LocationListQuery?.refetch();
  }, []);

  if (LocationListQuery?.isLoading) {
    return <div>Loading...</div>;
  }

  if (LocationListQuery?.isError) {
    return <div>Error fetching warehouse data</div>;
  }

  // Check if data is null or undefined
  if (!LocationListQuery?.data) {
    return <div>No data available</div>;
  }

  // Check if data is an array
  if (!Array.isArray(LocationListQuery?.data)) {
    return <div>Invalid data format</div>;
  }

  // Extracting labels and count values from the data
  const labels = LocationListQuery?.data?.map(
    (warehouse: any) => warehouse.nameEn
  );
  const countKeys = Object.keys(LocationListQuery?.data[0].counts);
  const datasets = countKeys.map((key) => ({
    label: key,
    data: LocationListQuery?.data?.map(
      (warehouse: any) => warehouse.counts[key]
    ),
    backgroundColor: getRandomColor(), // Custom color for bars
  }));

  // Creating the chart data object
  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div>
      <h2>Warehouse Counts</h2>
      <Bar data={chartData} />
    </div>
  );
};

// Function to generate random colors
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Example implementation of getByLocation function
function getByLocation() {
  return fetch('your-api-endpoint')
    .then((response) => response.json())
    .then((data) => {
      // Process and return the warehouse data
      return data.warehouses;
    });
}

export default WarehouseChart;
