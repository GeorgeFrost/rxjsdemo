import {Injectable} from 'angular2/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs/Rx';

import {IWidget, IDateRange, IDashboard} from '../models/dashboardModels';

@Injectable()
export class DashboardService {
    private _dashboard: IDashboard;

    dashboard: Subject<IDashboard> = new BehaviorSubject<IDashboard>(null);

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
    }

    update = (value: IDashboard): void => {
        this._dashboard = value;
        this.dashboard.next(this._dashboard);
    }

    updateDateRange = (startDate: Date, endDate: Date): void => {
        this._dashboard.dateRange = {
            start: startDate,
            end: endDate
        }
        this.dashboard.next(this._dashboard);
    }
}