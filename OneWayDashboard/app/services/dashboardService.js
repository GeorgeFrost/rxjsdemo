System.register(['angular2/core', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1;
    var DashboardService, MockHttpService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            DashboardService = (function () {
                function DashboardService() {
                    var _this = this;
                    this.dashboardEvents = new Rx_1.Subject();
                    this.dateRangeChange = new Rx_1.Subject();
                    this.updateWidget = new Rx_1.Subject();
                    this.saveDashboard = function (dashboard) {
                        _this._dashboard = dashboard;
                    };
                    var dashboard = MockHttpService.GetDashboard();
                    this.dashboard =
                        this.dashboardEvents
                            .scan(function (dashboard, operation) {
                            console.log("An event has just happened to the dashboard", dashboard);
                            return operation(dashboard);
                        }, dashboard)
                            .startWith(dashboard)
                            .publishReplay(1)
                            .refCount();
                    this.dateRangeChange
                        .map(function (newDateRange) {
                        return function (dashboard) {
                            dashboard.dateRange = newDateRange;
                            return dashboard;
                        };
                    })
                        .subscribe(this.dashboardEvents);
                    this.updateWidget
                        .map(function (newWidget) {
                        return function (dashboard) {
                            var newDashboard = dashboard;
                            var newWidgets = _.map(newDashboard.widgets, function (widget) {
                                if (widget.id === newWidget.id)
                                    return newWidget;
                                return widget;
                            });
                            newDashboard.widgets = newWidgets;
                            return newDashboard;
                        };
                    })
                        .subscribe(this.dashboardEvents);
                }
                DashboardService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DashboardService);
                return DashboardService;
            }());
            exports_1("DashboardService", DashboardService);
            MockHttpService = (function () {
                function MockHttpService() {
                }
                MockHttpService.GetDashboard = function () {
                    var widgets = [
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
                };
                return MockHttpService;
            }());
        }
    }
});
//# sourceMappingURL=dashboardService.js.map