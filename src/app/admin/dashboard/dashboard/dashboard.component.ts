import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BarChartOptions, LineChartOptions} from '../../../infrastructure/interfaces/chart-options';
import {radialChartOptions} from '../../../infrastructure/config/radial-chart';
import {OrdersService} from '../../services/orders.service';
import {IOrder} from '../../../infrastructure/interfaces/order';
import {OrderStatus} from '../../../infrastructure/enums/order-status';
import {ChartComponent} from 'ng-apexcharts';
import {lineChartOptions} from '../../../infrastructure/config/line-chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public lineChartOptions!: LineChartOptions;
  public deliveredChartOptions!: BarChartOptions;
  public pendingDeliveryChartOptions!: BarChartOptions;
  @ViewChild('deliveredChart', {static: false}) deliveredChart!: ChartComponent;
  @ViewChild('pendingDeliveryChart', {static: false}) pendingDeliveryChart!: ChartComponent;
  @ViewChild('lineChart', {static: false}) lineChart!: ChartComponent;

  public deliveredCount = 0;
  public pendingDeliveryCount = 0;
  public totalPrice = 0;
  public onTimeDeliveryCount = 0;
  public lateTimeDeliveryCount = 0;
  public totalCount = 0;
  public lineChartSeriesData: { x: string; y: number }[] = [];

  constructor(private ordersService: OrdersService) {
    this.ordersService.subscribeToListChanges();
    this.initRadialBarChart();
    this.iniLineChart();
    this.ordersService.orders$.subscribe((orders) => {
      this.calculateReportingValues(orders);
      this.updateBarChart(this.deliveredChartOptions,
        this.totalCount ? this.deliveredCount * 100 / this.totalCount : 0,
        (val: number) => this.deliveredCount.toString(), this.deliveredChart);
      this.updateBarChart(this.pendingDeliveryChartOptions,
        this.totalCount ? this.pendingDeliveryCount * 100 / this.totalCount : 0,
        (val: number) => this.pendingDeliveryCount.toString(), this.pendingDeliveryChart);

      this.updateLineChart(this.lineChartSeriesData);
    });
  }

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe();
  }

  public initRadialBarChart(): void {
    this.deliveredChartOptions = {
      ...radialChartOptions,
      fill: {
        ...radialChartOptions.fill,
        colors: ["#2ed4c2", '#3dded0'],
      },
    };
    this.pendingDeliveryChartOptions = {
      ...radialChartOptions,
      fill: {
        ...radialChartOptions.fill,
        colors: ["#ff5660", '#f1656c'],
      },
    };
  }

  public iniLineChart(): void {
    this.lineChartOptions = lineChartOptions;
  }

  public updateBarChart(chartOptions: BarChartOptions, value: number, formatter: (val: number) => string, chart: ChartComponent) {
    if (chartOptions) {
      const dataLabelValue = chartOptions.plotOptions.radialBar?.dataLabels?.value;
      if (dataLabelValue) {
        dataLabelValue.formatter = formatter;
      }
      chartOptions.series = [value];
    }
    if (chart && chartOptions) {
      chart.updateOptions(chartOptions)?.catch(() => {
      });
    }
  }

  public updateLineChart(chartSeries: { x: string; y: number }[]) {
    const maxInSeries = Math.max(...chartSeries.map(data => data.y));
    if (this.lineChartOptions) {
      this.lineChartOptions.series[0].data = chartSeries;
      this.lineChartOptions.yaxis.max = maxInSeries + 5;
      if (this.lineChart) {
        this.lineChart.updateOptions(this.lineChartOptions)?.catch(() => {
        });
      }
    }
  }

  public calculateReportingValues(orders: IOrder[]) {
    this.resetData();
    this.totalCount = orders.length;
    const grouped: { [key: string]: { x: string; y: number } } = {};
    orders.forEach((x) => {
      if (x.status === OrderStatus.COMPLETED) {
        this.deliveredCount++;
        if (x.completedTime) {
          const deliveryTime = new Date(x.completedTime).getTime() - new Date(x.createdTime).getTime();
          if (deliveryTime > 60 * 60 * 1000) {
            this.lateTimeDeliveryCount++;
          } else {
            this.onTimeDeliveryCount++;
          }
        }
      } else if (x.status === OrderStatus.IN_TRANSIT) {
        this.pendingDeliveryCount++;
      }
      if (x.createdTime) {
        const toHourOnly = new Date(x.createdTime)
        toHourOnly.setSeconds(0);
        toHourOnly.setMinutes(0);
        toHourOnly.setMilliseconds(0);
        const toHoursISO = toHourOnly.toISOString()
        if (!grouped[toHoursISO]) {
          grouped[toHoursISO] = {x: toHoursISO, y: 1};
        } else {
          grouped[toHoursISO].y++;
        }
      }
      this.totalPrice += Number(x.price) || 0;
    });
    this.lineChartSeriesData = Object.values(grouped);
  }

  get onTimeDeliveryPercent() {
    return this.deliveredCount ? (this.onTimeDeliveryCount * 100 / this.deliveredCount).toFixed(1) : 0;
  }

  get lateDeliveryPercent() {
    return this.deliveredCount ? (this.lateTimeDeliveryCount * 100 / this.deliveredCount).toFixed(1) : 0;
  }

  public resetData() {
    this.deliveredCount = 0;
    this.pendingDeliveryCount = 0;
    this.totalPrice = 0;
    this.onTimeDeliveryCount = 0
    this.lateTimeDeliveryCount = 0
    this.totalCount = 0;
    this.lineChartSeriesData = [];
  }

  public ngOnDestroy(): void {
    this.ordersService.unsubscribeToListChanges();
  }

}
