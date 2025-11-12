import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';

import { AnalogWelcome } from './analog-welcome';

@Component({
  selector: 'app-home',
  imports: [AnalogWelcome],
  template: `
     <app-analog-welcome/>
  `,
})
export default class Home {}

export const routeMeta: RouteMeta = {
  redirectTo: '/blog',
  pathMatch: 'full',
};

