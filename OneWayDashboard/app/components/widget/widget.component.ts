/// <reference path="../../../typings/underscore/underscore.d.ts" />

import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {DashboardService} from '../../services/dashboardService'
import {IDashboard} from '../../models/dashboardModels'

@Component({
    selector: 'widget',
    templateUrl: 'app/components/widget/widget.html',
    inputs: ['id'],
    host: { 'class': 'card' }
})

export class WidgetComponent {
    definition: any;
    dateRange: { start: string, end: string };

    private _dashboardService: DashboardService;
    private id;

    constructor(dashboardService: DashboardService) {
        this._dashboardService = dashboardService;
    }

    ngOnInit() {
        var id = this.id;

        this._dashboardService.dateRangeChange
            .subscribe(
            (dashboard: IDashboard) => {
                console.log("Date range change detected ", dashboard);

                this.dateRange = {
                    start: dashboard.dateRange.start == null ? null : moment(dashboard.dateRange.start).format("DD/MM/YYYY"),
                    end: dashboard.dateRange.end == null ? null : moment(dashboard.dateRange.end).format("DD/MM/YYYY")
                };

                this.definition = _.find(dashboard.widgets, (widget: any) => {
                    return widget.id === id;
                });
            });

        this._dashboardService.dashboard
            .subscribe(
            (dashboard: IDashboard) => {
                console.log("Dashboard change detected ", dashboard);

                this.definition = _.find(dashboard.widgets, (widget: any) => {
                    return widget.id === id;
                });
            });
    }
}
