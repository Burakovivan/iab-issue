import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, CommonModule],
})
export class AppComponent {
  constructor() { }
  AppComponent = AppComponent;
  public static Invisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
