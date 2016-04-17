/// <reference path="../../../typings/underscore/underscore.d.ts" />
System.register(['angular2/core', '../../services/dashboardService'], function(exports_1, context_1) {
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
    var core_1, dashboardService_1;
    var WidgetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dashboardService_1_1) {
                dashboardService_1 = dashboardService_1_1;
            }],
        execute: function() {
            WidgetComponent = (function () {
                function WidgetComponent(dashboardService) {
                    this._dashboardService = dashboardService;
                }
                WidgetComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this.id;
                    this._dashboardService.dashboard
                        .subscribe(function (dashboard) {
                        console.log("Dashboard change detected ", dashboard);
                        _this.dateRange = {
                            start: dashboard.dateRange.start == null ? null : moment(dashboard.dateRange.start).format("DD/MM/YYYY"),
                            end: dashboard.dateRange.end == null ? null : moment(dashboard.dateRange.end).format("DD/MM/YYYY")
                        };
                        _this.definition = _.find(dashboard.widgets, function (widget) {
                            return widget.id === id;
                        });
                    });
                };
                WidgetComponent = __decorate([
                    core_1.Component({
                        selector: 'widget',
                        templateUrl: 'app/components/widget/widget.html',
                        inputs: ['id'],
                        host: { 'class': 'card' }
                    }), 
                    __metadata('design:paramtypes', [dashboardService_1.DashboardService])
                ], WidgetComponent);
                return WidgetComponent;
            }());
            exports_1("WidgetComponent", WidgetComponent);
        }
    }
});
//# sourceMappingURL=widget.component.js.map