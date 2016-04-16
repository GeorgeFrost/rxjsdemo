import {Component} from 'angular2/core';

@Component({
    selector: 'app',
    templateUrl: 'app/components/app/app.html'
})

export class AppComponent {
    constructor() {
        console.log("Constructed");
    }
}
