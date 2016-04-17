import {Component} from 'angular2/core';

@Component({
    selector: 'widget',
    templateUrl: 'app/components/widget/widget.html',
    inputs: ['definition'],
    host: { 'class': 'card' }
})

export class WidgetComponent {
    definition: any;
}
