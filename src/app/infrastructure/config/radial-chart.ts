import {BarChartOptions} from '../interfaces/chart-options';

export const radialChartOptions: BarChartOptions = {
  series: [0],
  chart: {
    height: 200,
    type: "radialBar"
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "65%",
      },
      track: {
        strokeWidth: '70%',
        background: '#e8e8e8',
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: true,
          fontSize: '22px',
          color: '#535353',
          offsetY: 5,
          formatter: (val: number) => {
            return val.toString();
          }
        },
      }
    }
  },
  fill: {
    type: "solid",
  },
  stroke: {
    lineCap: "round",
  },
  labels: []
};
