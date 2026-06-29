import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { BackgroundColor, InAppBrowser, InvisibilityMode, ToolBarType } from '@capgo/capacitor-inappbrowser'
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class HomePage {
  WVCounter: number = 0;
  async openNewWV() {
    let { id } = await InAppBrowser.openWebView({
      url: `https://www.google.com/search?q=WV_number_${this.WVCounter++}`,
      toolbarType: ToolBarType.COMPACT,
      x: 0,
      y: 0,
      height: window.innerHeight * .8,
      width: window.innerWidth,
      buttonNearDone: {
        ios: {
          icon: "chevron.down",
          iconType: 'sf-symbol'
        },
        android: {
          icon: "ic_close_black_24dp",
          iconType: 'asset'
        }
      }, 
      backgroundColor: BackgroundColor.WHITE,
      hidden: false
    });
    this.showWV(id);
    this.WVIdList.next([...this.WVIdList.getValue(), id]);
    this.lastOpenedOrShownWVId = id;
  }
  closeWV(id: string) {
    InAppBrowser.close({ id });
  }
  showWV(id: string) {
    InAppBrowser.show({ id });
    this.lastOpenedOrShownWVId = id;
    console.log('showWV', id);
  }
  constructor() {
    this.Initialize();
  }
  public lastOpenedOrShownWVId: string | null = null;
  public WVIdList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public async Initialize() {
    InAppBrowser.addListener('closeEvent', (info) => {

      if (info?.id) {
        this.WVIdList.next(this.WVIdList.getValue().filter(id => id !== info.id));
      }
    });

    InAppBrowser.addListener('buttonNearDoneClick', (uselessObject) => {
      console.log('buttonNearDoneClick', uselessObject);
      if (this.lastOpenedOrShownWVId) {
        InAppBrowser.hide({ id: this.lastOpenedOrShownWVId })
      }

    })
  }

}

