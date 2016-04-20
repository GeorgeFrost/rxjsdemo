import {Injectable} from 'angular2/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs/Rx';

import {IWidget, IDateRange, IDashboard} from '../models/dashboardModels';

interface IDashboardOperation extends Function {
    (dashboard: IDashboard): IDashboard;
}

@Injectable()
export class DashboardService {
    private _dashboard: IDashboard;
    
    dashboardEvents: Subject<any> = new Subject<any>();

    dashboard: Observable<IDashboard>;
    
    dateRangeChange: Subject<any> = new Subject<any>();
    updateWidget: Subject<any> = new Subject<any>();
    
    constructor() {
        var dashboard = MockHttpService.GetDashboard();

        this.dashboard =
            this.dashboardEvents
            .scan((dashboard: IDashboard, operation: IDashboardOperation) => {
                console.log("An event has just happened to the dashboard", dashboard);
                return operation(dashboard);
            }, dashboard)
            .startWith(dashboard)
            .publishReplay(1)
            .refCount();        

        this.dateRangeChange
            .map(function (newDateRange: IDateRange): IDashboardOperation {
                return (dashboard: IDashboard) => {
                    dashboard.dateRange = newDateRange;
                    return dashboard;
                }
            })
            .subscribe(this.dashboardEvents);

        this.updateWidget
            .map(function (newWidget: IWidget): IDashboardOperation {
                return (dashboard: IDashboard) => {
                    var newDashboard = dashboard;

                    var newWidgets = _.map(newDashboard.widgets, (widget: IWidget) => {
                        if (widget.id === newWidget.id)
                            return newWidget;

                        return widget;
                    });

                    newDashboard.widgets = newWidgets;
                    return newDashboard;
                }
            })
            .subscribe(this.dashboardEvents);
    }
    
    private saveDashboard= (dashboard: IDashboard):void => {
        this._dashboard = dashboard;
    }
}

class MockHttpService {
    static GetDashboard() {
        var widgets: IWidget[] = [
            {
                id: 1,
                title: "Two way binding is the future",
                type: "image",
                data: "https://avatars2.githubusercontent.com/u/2462701?v=3&s=460",
                colour: "#6ed3cf"
            },
            {
                id: 2,
                title: "A text widget",
                type: "text",
                data: "Some Text",
                colour: "#9068be"
            }
        ];

        var initialDashboard = {
            name: "Test",
            dateRange: {
                start: new Date(2000, 1, 1),
                end: null
            },
            widgets: widgets
        };

        return initialDashboard;
    }
}