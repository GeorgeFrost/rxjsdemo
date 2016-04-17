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
                data: "barker.jpg"
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
                start: null,
                end: null
            },
            widgets: widgets
        };

        this.dashboard.next(this._dashboard);
    }
}