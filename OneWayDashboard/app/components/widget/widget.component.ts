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

    private _dashboardService: DashboardService;
    private id;

    constructor(dashboardService: DashboardService) {
        this._dashboardService = dashboardService;
    }

    ngOnInit() {
        var id = this.id;

        this._dashboardService.dashboard
            .subscribe(
            (dashboard: IDashboard) => {
                this.definition = _.find(dashboard.widgets, (widget: any) => {
                    return widget.id === id;
                });
            });
    }
}
