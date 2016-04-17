import {Injectable} from 'angular2/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs/Rx';

import {IWidget, IDateRange, IDashboard} from '../models/dashboardModels';

@Injectable()
export class DashboardService {
    private _dashboard: IDashboard;

    dashboard: Subject<IDashboard> = new BehaviorSubject<IDashboard>(null);
    
    //Action streams
    dateRangeChange: Subject<any> = new Subject<any>();

    constructor() {

        var widgets: IWidget[] = [
            {
                id: 1,
                title: "Two way binding is the future",
                type: "image",
                data: "remove" //https://avatars2.githubusercontent.com/u/2462701?v=3&s=460
            },
            {
                id: 2,
                title: "A text widget",
                type: "text",
                data: "Some Text"
            }
        ];

        this._dashboard = {
            name: "Test",
            dateRange: {
                start: new Date(2000,1,1),
                end: null
            },
            widgets: widgets
        };

        this.dashboard.next(this._dashboard);
        this.dateRangeChange.subscribe(
            (value: IDateRange) => {
                //Here is where you would do anything that needs to happen when the date range changes
                var newDashboard = this._dashboard;
                newDashboard.dateRange = value;
                this.saveDashboard(newDashboard);
            }
        );
    }

    update = (value: IDashboard): void => {
        this.saveDashboard(value);
        this.dashboard.next(this._dashboard);
    }

    private saveDashboard= (dashboard: IDashboard):void => {
        //This is where you'd make the http call to save the dashboard
        this._dashboard = dashboard;
    }
}