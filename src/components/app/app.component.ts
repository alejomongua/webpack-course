import { Component } from '@angular/core'

@Component({
  template: require('./app.component.html'),
  selector: "root-app",
  styleUrls: ['app.component.css'],
})

export class AppRoot {
  message = "Hello from Angular"
}