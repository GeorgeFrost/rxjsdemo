import {Component} from 'angular2/core';

import {DashboardComponent} from '../dashboard/dashboard.component'

@Component({
    selector: 'app',
    templateUrl: 'app/components/app/app.html',
    directives: [DashboardComponent]
})

export class AppComponent {}
