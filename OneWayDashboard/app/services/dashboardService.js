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
    var DashboardService;
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
                    this.dashboard = new Rx_1.BehaviorSubject(null);
                    //Action streams
                    this.dateRangeChange = new Rx_1.Subject();
                    this.update = function (value) {
                        _this._dashboard = value;
                        _this.dashboard.next(_this._dashboard);
                    };
                    var widgets = [
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
                            start: new Date(2000, 1, 1),
                            end: null
                        },
                        widgets: widgets
                    };
                    this.dashboard.next(this._dashboard);
                    this.dateRangeChange.subscribe(function (value) {
                        _this._dashboard.dateRange = value;
                    });
                }
                DashboardService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DashboardService);
                return DashboardService;
            }());
            exports_1("DashboardService", DashboardService);
        }
    }
});
//# sourceMappingURL=dashboardService.js.map