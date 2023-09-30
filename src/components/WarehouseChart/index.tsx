import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const WarehouseChart = ({ LocationListQuery }: any) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
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
  const labels = LocationListQuery?.data?.map((warehouse: any) =>
    language === 'ar' ? warehouse.nameAr : warehouse.nameEn
  );
  const countKeys = Object.keys(LocationListQuery?.data[0].counts);
  const colorPalette = ['#007bff', '#dc3545', '#ffc107', '#28a745'];
  const datasets = countKeys.map((key, index) => ({
    label: key,
    data: LocationListQuery?.data?.map(
      (warehouse: any) => warehouse.counts[key]
    ),
    backgroundColor: colorPalette[index % colorPalette.length], // Custom color for bars
  }));

  // Creating the chart data object
  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div>
      <h2>{t('TITLE.Location_Inspections')}</h2>
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

export default WarehouseChart;
