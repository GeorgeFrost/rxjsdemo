import {Component} from 'angular2/core';
import {DashboardService} from '../../services/dashboardService'
import {WidgetComponent} from '../widget/widget.component'

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
        this.dashboard = this._dashboardService.get();

        this.widgetRows = [];

        for (var i = 0; i < this.dashboard.widgets.length; i += 2) {
            var row = [];

            row.push(this.dashboard.widgets[i]);

            if ((i + 1) <= this.dashboard.widgets.length) {
                row.push(this.dashboard.widgets[i + 1]);
            }

            this.widgetRows.push(row);
        }

        console.log(this.widgetRows);
    }

    constructor(dashboardService: DashboardService) {
        this._dashboardService = dashboardService;
    }
}
