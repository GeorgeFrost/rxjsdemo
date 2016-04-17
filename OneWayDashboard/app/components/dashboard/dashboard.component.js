/// <reference path="../../../typings/moment/moment.d.ts" />
System.register(['angular2/core', 'angular2/common', '../../services/dashboardService', '../widget/widget.component'], function(exports_1, context_1) {
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
    var core_1, common_1, dashboardService_1, widget_component_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dashboardService_1_1) {
                dashboardService_1 = dashboardService_1_1;
            },
            function (widget_component_1_1) {
                widget_component_1 = widget_component_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(dashboardService, formBuilder) {
                    var _this = this;
                    this.dateRange = {
                        start: null,
                        end: null
                    };
                    this.rowifyWidgets = function (dashboard) {
                        _this.widgetRows = [];
                        for (var i = 0; i < dashboard.widgets.length; i += 2) {
                            var row = [];
                            row.push(dashboard.widgets[i]);
                            if ((i + 1) <= dashboard.widgets.length) {
                                row.push(dashboard.widgets[i + 1]);
                            }
                            _this.widgetRows.push(row);
                        }
                    };
                    this._dashboardService = dashboardService;
                    this.dateRangeForm = formBuilder.group({ 'start': [''], 'end': [''] });
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._dashboardService.dashboard
                        .subscribe(function (dashboard) {
                        _this.dashboard = dashboard;
                        _this.dateRange.start = dashboard.dateRange.start == null ? null : moment(dashboard.dateRange.start).format("YYYY-MM-DD");
                        _this.dateRange.end = dashboard.dateRange.end == null ? null : moment(dashboard.dateRange.end).format("YYYY-MM-DD");
                        _this.rowifyWidgets(dashboard);
                    });
                };
                DashboardComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.dateRangeForm.controls['start'].valueChanges.subscribe(function (value) { _this._dashboardService.updateDateRange(new Date(_this.dateRange.start), new Date(_this.dateRange.end)); });
                    this.dateRangeForm.controls['end'].valueChanges.subscribe(function (value) { _this._dashboardService.updateDateRange(new Date(_this.dateRange.start), new Date(_this.dateRange.end)); });
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'dashboard',
                        templateUrl: 'app/components/dashboard/dashboard.html',
                        providers: [dashboardService_1.DashboardService],
                        directives: [widget_component_1.WidgetComponent]
                    }), 
                    __metadata('design:paramtypes', [dashboardService_1.DashboardService, common_1.FormBuilder])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map