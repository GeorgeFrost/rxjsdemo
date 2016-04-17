/// <reference path="../../../typings/underscore/underscore.d.ts" />

import {Component} from 'angular2/core';

import {DashboardService} from '../../services/dashboardService'

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

        this.definition = _.find(this._dashboardService.get().widgets, (widget: any) => {
            return widget.id === id;
        });
    }
}
