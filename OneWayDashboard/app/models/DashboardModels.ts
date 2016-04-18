export interface IWidget {
    id: number;
    title: string;
    type: string;
    data: any;
    colour: string;
}

export interface IDateRange {
    start: Date,
    end: Date
}

export interface IDashboard {
    name: string,
    dateRange: IDateRange,
    widgets: Array<IWidget>
}