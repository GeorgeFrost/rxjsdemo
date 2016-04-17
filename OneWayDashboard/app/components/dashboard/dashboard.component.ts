import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {DashboardService} from '../../services/dashboardService'
import {WidgetComponent} from '../widget/widget.component'
import {IDashboard} from '../../models/dashboardModels'

@Component({
    selector: 'dashboard',
    templateUrl: 'app/components/dashboard/dashboard.html',
    providers: [DashboardService],
    directives: [WidgetComponent]
})

export class DashboardComponent {
    private _dashboardService: DashboardService;

    dashboard: any;
    widgetRows: any;

    ngOnInit() {
        this._dashboardService.dashboard
            .subscribe(
            (dashboard: IDashboard) => {
                console.log(dashboard);

                this.dashboard = dashboard;

                this.widgetRows = [];

                for (var i = 0; i < dashboard.widgets.length; i += 2) {
                    var row = [];

                    row.push(dashboard.widgets[i]);

                    if ((i + 1) <= dashboard.widgets.length) {
                        row.push(dashboard.widgets[i + 1]);
                    }

                    this.widgetRows.push(row);
                }
            });
    }

    constructor(dashboardService: DashboardService) {
        this._dashboardService = dashboardService;
    }
}
