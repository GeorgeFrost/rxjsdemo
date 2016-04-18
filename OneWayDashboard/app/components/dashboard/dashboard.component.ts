/// <reference path="../../../typings/moment/moment.d.ts" />

import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup} from 'angular2/common';
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

    dashboard: IDashboard;
    widgetRows: any;
    dateRange = {
        start: null,
        end: null
    }

    dateRangeForm: ControlGroup;

    ngOnInit() {

        this.dashboard = {
            name: "nam", dateRange: { start: null, end: null }, widgets: []
        };

        this._dashboardService.dashboard
            .subscribe(
            (dashboard: IDashboard) => {
                this.dashboard = dashboard;
                
                this.dateRange.start = dashboard.dateRange.start == null ? null : moment(dashboard.dateRange.start).format("YYYY-MM-DD");
                this.dateRange.end = dashboard.dateRange.end == null ? null : moment(dashboard.dateRange.end).format("YYYY-MM-DD");

                this.rowifyWidgets(dashboard);
            });
    }

    ngAfterViewInit() {
        this.dateRangeForm.controls['start'].valueChanges.subscribe(
            (value: Date) => {
                this._dashboardService.dateRangeChange.next({ start: new Date(this.dateRange.start), end: new Date(this.dateRange.end) }) 
            });

        this.dateRangeForm.controls['end'].valueChanges.subscribe(
            (value: Date) => {
                this._dashboardService.dateRangeChange.next({ start: new Date(this.dateRange.start), end: new Date(this.dateRange.end) })
            });
    }

    private rowifyWidgets = (dashboard: IDashboard): void => {
        this.widgetRows = [];

        for (var i = 0; i < dashboard.widgets.length; i += 2) {
            var row = [];

            row.push(dashboard.widgets[i]);

            if ((i + 1) <= dashboard.widgets.length) {
                row.push(dashboard.widgets[i + 1]);
            }

            this.widgetRows.push(row);
        }
    }

    constructor(dashboardService: DashboardService, formBuilder: FormBuilder) {
        this._dashboardService = dashboardService;

        this.dateRangeForm = formBuilder.group({ 'start': [''], 'end': [''] });
    }
}
