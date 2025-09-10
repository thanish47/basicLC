import { Component, ViewChild } from '@angular/core';
import { RightSidePanelComponent } from './layout/right-side-panel/right-side-panel.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  @ViewChild(RightSidePanelComponent) rPanel: any;
  
  title = 'studio-app-angular';
  toggleRPanel() {
    this.rPanel.togglePanel()
  }
}
