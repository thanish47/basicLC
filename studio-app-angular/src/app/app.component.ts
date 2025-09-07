import { Component, ViewChild } from '@angular/core';
import { RightSidePanelComponent } from './layout/right-side-panel/right-side-panel.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(RightSidePanelComponent) rPanel: any;
  
  title = 'studio-app-angular';
  toggleRPanel() {
    this.rPanel.togglePanel()
  }
}
