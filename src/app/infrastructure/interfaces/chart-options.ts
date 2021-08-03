import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexStroke,
  ApexFill,
  ApexAxisChartSeries,
  ApexGrid,
  ApexXAxis,
  ApexYAxis,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexDataLabels
} from "ng-apexcharts";

export type BarChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  fill: ApexFill;
};

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  // dataLabels: ApexDataLabels;
  // grid: ApexGrid;
  fill: ApexFill;
  // markers: ApexMarkers;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
