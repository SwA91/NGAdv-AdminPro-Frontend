import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() title: string = 'Sin titulo';

  @Input('labels')
  public doughnutChartLabels: string[] = [
    'Label 1',
    'Label 2',
  ];

  @Input('data')
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [10, 20, 30] },
      { data: [40, 50, 60] },
    ],
  };

  public doughnutChartType: ChartType = 'doughnut';

}
