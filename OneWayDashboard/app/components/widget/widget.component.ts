/// <reference path="../../../typings/underscore/underscore.d.ts" />

import {Component, ElementRef} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {DashboardService} from '../../services/dashboardService'
import {IDashboard, IWidget} from '../../models/dashboardModels'

@Component({
    selector: 'widget',
    templateUrl: 'app/components/widget/widget.html',
    inputs: ['id'],
    host: { 'class': 'card' }
})

export class WidgetComponent {
    definition: IWidget;
    dateRange: { start: string, end: string };
    
    private id;

    constructor(private _dashboardService: DashboardService, private _el: ElementRef) { }

    ngOnInit() {
        var id = this.id;
        
        this._dashboardService.dashboard
            .subscribe(
            (dashboard: IDashboard) => {
                this.dateRange = {
                    start: dashboard.dateRange.start == null ? null : moment(dashboard.dateRange.start).format("DD/MM/YYYY"),
                    end: dashboard.dateRange.end == null ? null : moment(dashboard.dateRange.end).format("DD/MM/YYYY")
                };

                this.definition = _.find(dashboard.widgets, (widget: any) => {
                    return widget.id === id;
                });

                this._el.nativeElement.style.backgroundColor = this.definition.colour;
            });
    }

    changeColour(colour: string) {
        this.definition.colour = colour;

        this._dashboardService.updateWidget.next(this.definition);
    }
}
