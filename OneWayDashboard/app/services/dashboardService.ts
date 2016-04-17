import {Injectable} from 'angular2/core';

@Injectable()
export class DashboardService {
    dashboard: any;

    constructor() {
        this.dashboard = {
            name: "Test",
            dateRange: {
                start: null,
                end: null
            },
            widgets: [
                {
                    id: 1,
                    title: "Two way binding is the future",
                    type: "image",
                    src: "barker.jpg"
                },
                {
                    id: 2,
                    title: "A text widget",
                    type: "text",
                    text: "Some Text"
                }
            ]
        };
    }

    get() {
        return this.dashboard;
    }
}