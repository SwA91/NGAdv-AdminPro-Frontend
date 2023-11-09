import { Component } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['Pan', 'Refresco', 'Tacos'];
  public data1: ChartData<'doughnut'> = {
    labels: ['Download', 'Upload'],
    datasets : [
      { data: [350, 450, 100] },
      { data: [50, 150, 120] },
    ]

  };

}
