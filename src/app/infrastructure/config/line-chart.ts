import {LineChartOptions} from '../interfaces/chart-options';

export const lineChartOptions: LineChartOptions = {
  series: [
    {
      name: "Order(s)",
      color: '#fad962',
      data: []
    }
  ],
  chart: {
    height: 350,
    type: "line",
    toolbar: {
      show: true,
    }
  },
  stroke: {
    width: 7,
    curve: "smooth"
  },
  xaxis: {
    position: 'top',
    type: "datetime",
  },
  title: {
    text: "Order History",
    align: "center",
    style: {
      fontSize: "14px",
      fontWeight: '600',
      color: "#4e4e4e"
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.2,
      opacityFrom: 5,
      opacityTo: 13,
      type: "horizontal",
      stops: [0, 50, 100],
    }
  },
  yaxis: {
    min: 1,
    max: 5,
  },
};
